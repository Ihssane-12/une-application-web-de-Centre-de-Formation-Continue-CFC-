const validateApplicationAdmin = async (applicationId, decision) => {
    // Logic to validate or reject application
    return { success: true, newStatus: decision };
};
module.exports = { validateApplicationAdmin };
