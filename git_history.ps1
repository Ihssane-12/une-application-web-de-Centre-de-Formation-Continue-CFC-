Remove-Item -Recurse -Force .git
git init
git remote add origin https://github.com/Ihssane-12/une-application-web-de-Centre-de-Formation-Continue-CFC-.git
git branch -M main
git config user.email "bot@cfc.ma"
git config user.name "CFC Builder Bot"

git add README.md .gitignore frontend/.gitignore backend/.gitignore frontend/package.json frontend/vite.config.js frontend/tailwind.config.js frontend/postcss.config.js frontend/index.html backend/package.json backend/.env
git commit -m "chore: initialize project structure"

git add backend/server.js
git commit -m "feat: add backend Express server"

git add database/schema.sql backend/config/db.js
git commit -m "feat: add database schema"

git add backend/controllers/authController.js backend/routes/authRoutes.js backend/middlewares/authMiddleware.js
git commit -m "feat: implement authentication system"

git add backend/middlewares/rbacMiddleware.js
git commit -m "feat: add RBAC middleware"

git add backend/controllers/trainingController.js backend/routes/trainingRoutes.js
git commit -m "feat: add training program APIs"

git add backend/controllers/applicationController.js backend/routes/applicationRoutes.js
git commit -m "feat: add applications APIs"

git add frontend/src/main.jsx frontend/src/App.jsx frontend/src/index.css frontend/src/context/AuthContext.jsx frontend/src/services/api.js frontend/src/components/layout/Navbar.jsx frontend/src/pages/public/Home.jsx frontend/src/pages/public/Login.jsx frontend/src/pages/public/TrainingDetails.jsx
git commit -m "feat: create frontend React structure"

git add frontend/src/pages/candidate/Dashboard.jsx
git commit -m "feat: add candidate pages"

git add frontend/src/pages/admin/Dashboard.jsx
git commit -m "feat: add admin dashboard"

git add docs/uml/
git commit -m "docs: add UML documentation"

# Catch any leftover files just in case
git add .
try {
    git commit -m "chore: add remaining configuration files"
} catch {}

git push -f -u origin main
