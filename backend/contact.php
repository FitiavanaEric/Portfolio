<?php
/**
 * Endpoint du formulaire de contact.
 *
 * Reçoit un JSON { name, email, message } en POST, valide les champs,
 * enregistre le message en base MySQL (si disponible) et envoie un e-mail
 * de notification. Répond toujours en JSON.
 */

declare(strict_types=1);

require_once __DIR__ . '/db.php';

// --- Adresse qui recevra les notifications de contact ---
// Remplace par ta vraie adresse, ou définis la variable d'environnement CONTACT_EMAIL.
const DEFAULT_CONTACT_EMAIL = 'votre.email@example.com';

// Autorise les requêtes du frontend (adapte l'origine si besoin en prod)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée.']);
    exit;
}

function respond(int $status, bool $success, string $message): void
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message]);
    exit;
}

$raw = file_get_contents('php://input');
$data = json_decode($raw, true);

if (!is_array($data)) {
    respond(400, false, 'Requête invalide.');
}

$name = trim((string)($data['name'] ?? ''));
$email = trim((string)($data['email'] ?? ''));
$message = trim((string)($data['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    respond(422, false, 'Merci de remplir tous les champs.');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Adresse e-mail invalide.');
}

if (mb_strlen($name) > 150 || mb_strlen($email) > 190 || mb_strlen($message) > 5000) {
    respond(422, false, 'Un des champs dépasse la longueur autorisée.');
}

// --- 1. Enregistrement en base MySQL (best-effort) ---
$pdo = getDbConnection();
if ($pdo !== null) {
    try {
        $stmt = $pdo->prepare(
            'INSERT INTO messages (name, email, message) VALUES (:name, :email, :message)'
        );
        $stmt->execute([
            ':name' => $name,
            ':email' => $email,
            ':message' => $message,
        ]);
    } catch (PDOException $e) {
        error_log('Insertion MySQL échouée : ' . $e->getMessage());
        // On continue quand même : l'e-mail reste le canal principal.
    }
}

// --- 2. Envoi d'un e-mail de notification (best-effort) ---
$contactEmail = getenv('CONTACT_EMAIL') ?: DEFAULT_CONTACT_EMAIL;
$subject = "Nouveau message depuis le portfolio - {$name}";
$body = "Nom : {$name}\nEmail : {$email}\n\nMessage :\n{$message}\n";
$headers = "From: no-reply@" . ($_SERVER['HTTP_HOST'] ?? 'localhost') . "\r\n"
    . "Reply-To: {$email}\r\n"
    . "Content-Type: text/plain; charset=utf-8\r\n";

$mailSent = false;
if (function_exists('mail')) {
    // mail() nécessite un serveur mail configuré (courant chez la plupart
    // des hébergeurs PHP mutualisés). En local, ce sera généralement ignoré.
    $mailSent = @mail($contactEmail, $subject, $body, $headers);
}

if (!$mailSent && $pdo === null) {
    // Ni l'e-mail ni la base n'ont fonctionné : on prévient l'utilisateur.
    respond(
        502,
        false,
        "Le message n'a pas pu être transmis. Contactez-moi directement par e-mail."
    );
}

respond(200, true, 'Message bien reçu, merci !');
