<?php
/**
 * Configuration de connexion à la base de données MySQL.
 *
 * Les valeurs par défaut lisent des variables d'environnement pour éviter
 * de committer de vrais identifiants. En local, tu peux aussi simplement
 * remplacer les valeurs par défaut ci-dessous par les tiennes.
 */

function getDbConnection(): ?PDO
{
    $host = getenv('DB_HOST') ?: '127.0.0.1';
    $port = getenv('DB_PORT') ?: '3306';
    $dbname = getenv('DB_NAME') ?: 'portfolio';
    $user = getenv('DB_USER') ?: 'root';
    $password = getenv('DB_PASSWORD') ?: '';

    try {
        $dsn = "mysql:host={$host};port={$port};dbname={$dbname};charset=utf8mb4";
        $pdo = new PDO($dsn, $user, $password, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        return $pdo;
    } catch (PDOException $e) {
        // On ne bloque pas l'envoi du message si la base est indisponible :
        // contact.php gère ce cas en repli (voir STORE_IN_DB).
        error_log('Connexion MySQL échouée : ' . $e->getMessage());
        return null;
    }
}
