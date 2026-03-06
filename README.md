# Centre de Formation Continue (CFC)

Une application web complète (Full-Stack) pour la gestion d'un Centre de Formation Continue universitaire.

## Architecture du Projet
Ce dépôt contient le code source complet structuré comme suit :

\`\`\`text
CFC_PROJECT
 ├── backend/        # API Node.js/Express avec authentification JWT
 ├── frontend/       # Interface Utilisateur React.js avec TailwindCSS
 ├── database/       # Schémas et scripts SQL (PostgreSQL)
 ├── docs/           # Documentation technique (Diagrammes UML)
 └── README.md
\`\`\`

## Fonctionnalités Principales (RBAC)
- **Candidat** : Inscription, consultation du catalogue de formations, soumission et suivi des dossiers de candidature.
- **Coordinateur** : Gestion des formations assignées, ouverture et fermeture des campagnes d'inscription.
- **Admin d'Établissement** : Création et publication de formations, validation et rejet des candidatures.
- **SuperAdmin** : Superviseur global du système.

## Technologies Utilisées
- **Backend**: Node.js, Express, PostgreSQL, JWT (authentification).
- **Frontend**: React.js, TailwindCSS, Axios, React Router.

## Installation et Déploiement

### Prérequis
- Node.js (v16+)
- PostgreSQL installé et configuré

### Installation du Backend
1. Naviguer vers \`backend/\` : \`cd backend/\`
2. Installer les dépendances : \`npm install\`
3. Configurer les variables d'environnement dans un fichier \`.env\` (utiliser \`.env.example\` comme modèle).
4. Lancer le serveur de développement : \`npm run dev\`

### Installation du Frontend
1. Naviguer vers \`frontend/\` : \`cd frontend/\`
2. Installer les dépendances : \`npm install\`
3. Lancer le serveur Vite : \`npm run dev\`
