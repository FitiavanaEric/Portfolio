# Portfolio — Rakotomihaja Eric Fitiavana

Portfolio personnel : **React + TypeScript + Vite + Tailwind CSS** côté frontend,
**PHP + MySQL** côté backend pour le formulaire de contact. Mode sombre / clair inclus.

```
portfolio/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── src/
│   ├── main.tsx
│   ├── App.tsx          (le portfolio)
│   ├── index.css
│   └── vite-env.d.ts
└── backend/
    ├── contact.php       (endpoint du formulaire)
    ├── db.php            (connexion MySQL)
    ├── schema.sql         (table des messages)
    └── .env.example
```

## 1. Frontend (React + TypeScript)

```bash
npm install
npm run dev
```

Ouvre l'adresse affichée (en général `http://localhost:5173`).

`npm run dev` vérifie aussi les types avant de builder (`tsc && vite build` au build).

## 2. Backend (PHP + MySQL)

### Créer la base de données

```bash
mysql -u root -p < backend/schema.sql
```

Cela crée une base `portfolio` avec une table `messages`.

### Configurer les variables d'environnement

```bash
cp backend/.env.example backend/.env
```

Puis modifie `backend/.env` avec tes identifiants MySQL et ton adresse e-mail de contact.
PHP ne charge pas `.env` automatiquement : en local, exporte les variables avant de lancer le
serveur (ou utilise un outil comme `phpdotenv` si tu préfères), par exemple :

```bash
export $(cat backend/.env | xargs)
php -S localhost:8000 -t backend
```

### Lancer le backend en local

```bash
php -S localhost:8000 -t backend
```

Le `vite.config.ts` redirige déjà `/backend/*` vers `http://localhost:8000` en développement,
donc le formulaire de contact fonctionne directement avec `npm run dev`.

## 3. Comment fonctionne le formulaire de contact

1. Le composant `ContactForm` (dans `src/App.tsx`) envoie une requête `POST` en JSON vers
   `${VITE_API_URL}/contact.php`.
2. `backend/contact.php` valide les champs, enregistre le message dans la table `messages`
   (best-effort) puis envoie un e-mail de notification via `mail()` (best-effort).
3. La réponse JSON (`{ success, message }`) met à jour l'interface (succès / erreur).

## 4. Build pour la production

```bash
npm run build
```

Génère le dossier `dist/` (frontend statique). Le dossier `backend/` doit être déployé à côté,
sur un serveur qui supporte PHP.

## 5. Déploiement

Le frontend est 100% statique, mais le backend a besoin d'un serveur PHP + MySQL. Deux
approches possibles :

- **Hébergement mutualisé classique (OVH, Hostinger, o2switch, cPanel, etc.)** — le plus simple :
  1. `npm run build`
  2. Envoie le contenu de `dist/` à la racine de ton espace web (ex. `public_html/`).
  3. Envoie le dossier `backend/` à côté (ex. `public_html/backend/`).
  4. Crée la base MySQL depuis le panneau d'administration (phpMyAdmin) en important
     `backend/schema.sql`.
  5. Renseigne les identifiants MySQL en variables d'environnement PHP (ou directement dans
     `backend/db.php` si ton hébergeur ne permet pas de variables d'environnement).
  6. Vérifie que `VITE_API_URL` (au build) correspond au chemin réel de `backend/` sur le serveur
     (souvent simplement `/backend`).

- **Frontend et backend séparés** (ex. frontend sur Vercel/Netlify, backend PHP sur un VPS ou un
  hébergeur PHP dédié) :
  1. Déploie `backend/` sur un serveur PHP (Apache/Nginx + PHP-FPM) avec sa base MySQL.
  2. Configure `CONTACT_EMAIL`, `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASSWORD` sur ce serveur.
  3. Dans `backend/contact.php`, adapte `Access-Control-Allow-Origin` pour n'autoriser que le
     domaine de ton frontend (au lieu de `*`).
  4. Définis `VITE_API_URL` (fichier `.env` à la racine du frontend, lu par Vite) avec l'URL
     complète du backend, ex. `VITE_API_URL=https://api.tondomaine.com`, puis relance
     `npm run build`.

> Vercel, Netlify et GitHub Pages ne font tourner que du contenu statique : ils ne peuvent pas
> exécuter `backend/contact.php` directement. Choisis un hébergeur qui supporte PHP pour cette
> partie, ou héberge le backend séparément comme décrit ci-dessus.

## À personnaliser

- `src/App.tsx` : remplace les liens de contact (email, téléphone, GitHub, LinkedIn) par les tiens.
- La section **Projets** contient 3 exemples à remplacer par tes vrais projets.
- `backend/.env` : ton adresse e-mail de contact et tes identifiants MySQL.
