const openRegistrationPeriod = async (trainingId, startDate, endDate) => {
    // Logic to open registrations
    return { success: true, message: "Period opened" };
};
const closeRegistrationPeriod = async (trainingId) => {
    // Logic to close registrations
    return { success: true, message: "Period closed" };
};
module.exports = { openRegistrationPeriod, closeRegistrationPeriod };
