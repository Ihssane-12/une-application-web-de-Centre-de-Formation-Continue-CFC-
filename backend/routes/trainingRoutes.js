const express = require('express');
const {
    getTrainings,
    createTraining,
    editTraining,
    publishTraining,
    openRegistration,
    closeRegistration
} = require('../controllers/trainingController');

const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/rbacMiddleware');

const router = express.Router();

// Public route to view trainings
router.get('/', getTrainings);

// Creation, Edit, Publish - SuperAdmin & EstablishmentAdmin
router.post('/', authenticateToken, authorizeRoles('SuperAdmin', 'EstablishmentAdmin'), createTraining);
router.put('/:id', authenticateToken, authorizeRoles('SuperAdmin', 'EstablishmentAdmin'), editTraining);
router.post('/:id/publish', authenticateToken, authorizeRoles('SuperAdmin', 'EstablishmentAdmin'), publishTraining);

// Registrations Management - Coordinators
router.post('/:id/open-registration', authenticateToken, authorizeRoles('Coordinator', 'SuperAdmin'), openRegistration);
router.post('/:id/close-registration', authenticateToken, authorizeRoles('Coordinator', 'SuperAdmin'), closeRegistration);

module.exports = router;
