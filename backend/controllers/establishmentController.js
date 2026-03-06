const getEstablishments = async (req, res, next) => {
    res.status(200).json([{ id: 1, name: 'ENSA Khouribga', code: 'ENSA' }]);
};

const createEstablishment = async (req, res, next) => {
    res.status(201).json({ message: 'Establishment created', data: req.body });
};

module.exports = { getEstablishments, createEstablishment };
