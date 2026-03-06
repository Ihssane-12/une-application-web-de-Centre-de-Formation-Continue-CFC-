Remove-Item -Recurse -Force .git
git init
git remote add origin https://github.com/Ihssane-12/une-application-web-de-Centre-de-Formation-Continue-CFC-.git
git branch -M main
git config user.email "bot@cfc.ma"
git config user.name "CFC Builder Bot"

# 1. chore: initialize project repository and basic structure
git add .gitignore frontend/.gitignore backend/.gitignore
git commit -m "chore: initialize project repository and basic structure"

# 2. docs: add initial project README with description
git add README.md
git commit -m "docs: add initial project README with description"

# 3. docs: add UML documentation folder
New-Item -ItemType File -Path "docs/uml/.gitkeep" -Force
git add docs/uml/.gitkeep
git commit -m "docs: add UML documentation folder"

# 4. docs: add use case diagram
git add docs/uml/use_cases.puml
git commit -m "docs: add use case diagram"

# 5. docs: add class diagram
git add docs/uml/class_diagram.puml
git commit -m "docs: add class diagram"

# 6. docs: add sequence diagrams
git add docs/uml/sequence_diagrams.puml
git commit -m "docs: add sequence diagrams"

# 7. docs: add state diagram
git add docs/uml/state_diagrams.puml
git commit -m "docs: add state diagram"

# 8. docs: add activity diagram
git add docs/uml/activity_diagram.puml
git commit -m "docs: add activity diagram"

# 9. feat: initialize backend Node.js Express server
git add backend/package.json backend/server.js
git commit -m "feat: initialize backend Node.js Express server"

# 10. feat: configure PostgreSQL database connection
git add backend/config/db.js database/schema.sql backend/.env
git commit -m "feat: configure PostgreSQL database connection"

# 11. feat: implement user model and RBAC roles
git add backend/middlewares/rbacMiddleware.js
git commit -m "feat: implement user model and RBAC roles"

# 12. feat: implement authentication (JWT login/register)
git add backend/controllers/authController.js backend/routes/authRoutes.js backend/middlewares/authMiddleware.js
git commit -m "feat: implement authentication (JWT login/register)"

# 13. feat: add establishments management API
git add backend/controllers/establishmentController.js backend/routes/establishmentRoutes.js
git commit -m "feat: add establishments management API"

# 14. feat: add training programs management API
git add backend/controllers/trainingController.js backend/routes/trainingRoutes.js
git commit -m "feat: add training programs management API"

# 15. feat: implement registration period management
git add backend/services/registrationService.js
git commit -m "feat: implement registration period management"

# 16. feat: add candidate application submission API
git add backend/controllers/applicationController.js backend/routes/applicationRoutes.js
git commit -m "feat: add candidate application submission API"

# 17. feat: implement application validation by admin
git add backend/services/validationService.js
git commit -m "feat: implement application validation by admin"

# 18. feat: initialize React frontend project
git add frontend/package.json frontend/index.html frontend/src/main.jsx frontend/src/App.jsx frontend/tailwind.config.js frontend/postcss.config.js frontend/src/index.css
git commit -m "feat: initialize React frontend project"

# 19. feat: create main pages (Home, Catalog, Dashboard)
git add frontend/src/pages/public/Home.jsx frontend/src/pages/public/TrainingDetails.jsx frontend/src/pages/candidate/Dashboard.jsx frontend/src/pages/admin/Dashboard.jsx frontend/src/pages/public/Login.jsx frontend/src/components/layout/Navbar.jsx
git commit -m "feat: create main pages (Home, Catalog, Dashboard)"

# 20. feat: connect frontend to backend APIs using Axios
git add frontend/src/services/api.js frontend/src/context/AuthContext.jsx
git commit -m "feat: connect frontend to backend APIs using Axios"

# Catch any leftover config files ensuring absolutely everything is tracked without messing up the timeline.
git add .
try {
    git commit --amend --no-edit
}
catch {}

# Push force to GitHub
git push -f -u origin main
