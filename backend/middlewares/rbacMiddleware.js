/**
 * RBAC Middleware definition
 * Compares the user's role contained in req.user against the allowed roles.
 */
const authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        // req.user must be populated by authenticateToken first
        if (!req.user || !req.user.role) {
            return res.status(401).json({ message: 'Unauthorized. Role missing.' });
        }

        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({
                message: `Forbidden: Access restricted to ${allowedRoles.join(', ')}.`
            });
        }

        next();
    };
};

module.exports = { authorizeRoles };
