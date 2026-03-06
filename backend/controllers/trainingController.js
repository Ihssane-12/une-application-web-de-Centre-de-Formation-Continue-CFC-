// MOCK DATABASE
const trainings = [];

const getTrainings = async (req, res, next) => {
    try {
        // Candidates only see "Published"
        // Admins might see all depending on implementation
        res.status(200).json(trainings);
    } catch (error) {
        next(error);
    }
};

const createTraining = async (req, res, next) => {
    try {
        const { title, description, establishmentId } = req.body;
        const newTraining = {
            id: trainings.length + 1,
            title,
            description,
            status: 'Draft',
            establishmentId,
            coordinatorId: null,
            registration: { isOpen: false }
        };
        trainings.push(newTraining);
        res.status(201).json({ message: 'Training created successfully', training: newTraining });
    } catch (error) {
        next(error);
    }
};

const editTraining = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        const training = trainings.find(t => t.id === parseInt(id));
        if (!training) return res.status(404).json({ message: 'Training not found' });

        if (title) training.title = title;
        if (description) training.description = description;

        res.status(200).json({ message: 'Training updated', training });
    } catch (error) {
        next(error);
    }
};

const publishTraining = async (req, res, next) => {
    try {
        const { id } = req.params;
        const training = trainings.find(t => t.id === parseInt(id));
        if (!training) return res.status(404).json({ message: 'Training not found' });

        training.status = 'Published';
        res.status(200).json({ message: 'Training published', training });
    } catch (error) {
        next(error);
    }
};

const openRegistration = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { startDate, endDate } = req.body;

        const training = trainings.find(t => t.id === parseInt(id));
        if (!training) return res.status(404).json({ message: 'Training not found' });

        training.registration = { isOpen: true, startDate, endDate };
        res.status(200).json({ message: 'Registration opened', training });
    } catch (error) {
        next(error);
    }
};

const closeRegistration = async (req, res, next) => {
    try {
        const { id } = req.params;
        const training = trainings.find(t => t.id === parseInt(id));
        if (!training) return res.status(404).json({ message: 'Training not found' });

        if (training.registration) {
            training.registration.isOpen = false;
        }
        res.status(200).json({ message: 'Registration closed', training });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getTrainings,
    createTraining,
    editTraining,
    publishTraining,
    openRegistration,
    closeRegistration
};
