// MOCK DATABASE
const applications = [];

const getApplications = async (req, res, next) => {
    try {
        // Return all for demonstration, filter in a real scenario
        res.status(200).json(applications);
    } catch (error) {
        next(error);
    }
};

const createApplication = async (req, res, next) => {
    try {
        const { trainingId } = req.body;
        const candidateId = req.user.id;

        const newApp = {
            id: applications.length + 1,
            candidateId,
            trainingId,
            status: 'PreRegistered',
            documents: []
        };

        applications.push(newApp);
        res.status(201).json({ message: 'Pre-registration saved', application: newApp });
    } catch (error) {
        next(error);
    }
};

const uploadDocuments = async (req, res, next) => {
    try {
        const { applicationId, documentType, fileUrl } = req.body;

        const app = applications.find(a => a.id === parseInt(applicationId));
        if (!app) return res.status(404).json({ message: 'Application not found' });

        app.documents.push({ documentType, fileUrl });
        app.status = 'FileSubmitted';

        res.status(200).json({ message: 'Documents uploaded and submitted', application: app });
    } catch (error) {
        next(error);
    }
};

const acceptApplication = async (req, res, next) => {
    try {
        const { id } = req.params;
        const app = applications.find(a => a.id === parseInt(id));
        if (!app) return res.status(404).json({ message: 'Application not found' });

        app.status = 'Accepted';
        res.status(200).json({ message: 'Application accepted', application: app });
    } catch (error) {
        next(error);
    }
};

const rejectApplication = async (req, res, next) => {
    try {
        const { id } = req.params;
        const app = applications.find(a => a.id === parseInt(id));
        if (!app) return res.status(404).json({ message: 'Application not found' });

        app.status = 'Rejected';
        res.status(200).json({ message: 'Application rejected', application: app });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getApplications,
    createApplication,
    uploadDocuments,
    acceptApplication,
    rejectApplication
};
