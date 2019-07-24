const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Trip = require('../models/trip');
const { error505 } = require('../util/error');

exports.createTrip = async (req, res, next) => {
    const { startAddress, endAddress, price, id } = req.body;
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed!');
            error.statusCode = 422;
            error.success = false;
            throw error;
        }
        const user = await User.findOne({ where: { id } });
        if (!user) {
            const error = new Error('A user could not be found.');
            error.statusCode = 401;
            error.success = false;
            throw error;
        }
        const trip = await user.createTrip({
            startAddress,
            endAddress,
            price
        });
        res.status(200).json({ message: 'Trip created!', success: true, trip });
    } catch (error) {
        error505(error, next);
        return error;
    }
};

exports.getTrips = async (req, res, next) => {
    const { userId } = req;
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            const error = new Error('A user could not be found.');
            error.statusCode = 401;
            error.success = false;
            throw error;
        }
        const trips = await Trip.findAll({ where: { userId } });
        res.status(200).json({ message: 'Trips found!', success: true, trips });
    } catch (error) {
        error505(error, next);
        return error;
    }
};