const express = require('express');
const {
    getApplications,
    createApplication,
    uploadDocuments,
    acceptApplication,
    rejectApplication
} = require('../controllers/applicationController');

const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/rbacMiddleware');

const router = express.Router();

// Candidates can apply and see their applications
router.get('/', authenticateToken, getApplications);
router.post('/', authenticateToken, authorizeRoles('Candidate'), createApplication);
router.post('/upload', authenticateToken, authorizeRoles('Candidate'), uploadDocuments);

// Admins evaluate the applications
router.put('/:id/accept', authenticateToken, authorizeRoles('EstablishmentAdmin', 'SuperAdmin'), acceptApplication);
router.put('/:id/reject', authenticateToken, authorizeRoles('EstablishmentAdmin', 'SuperAdmin'), rejectApplication);

module.exports = router;
