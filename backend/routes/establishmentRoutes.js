const express = require('express');
const { getEstablishments, createEstablishment } = require('../controllers/establishmentController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizeRoles } = require('../middlewares/rbacMiddleware');

const router = express.Router();

router.get('/', getEstablishments);
router.post('/', authenticateToken, authorizeRoles('SuperAdmin'), createEstablishment);

module.exports = router;
