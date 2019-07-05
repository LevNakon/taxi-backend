const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Driver = require('../models/driver');
const Car = require('../models/car');
const { error505 } = require('../util/error');

exports.createCar = async (req, res, next) => {
    const { userId } = req;
    const { brand, model, year, run } = req.body;
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed!');
            error.statusCode = 422;
            error.success = false;
            throw error;
        }
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            const error = new Error('A user could not be found.');
            error.statusCode = 401;
            error.success = false;
            throw error;
        }
        const driver = await Driver.findOne({ where: { id: user.driverId } });
        if (!driver) {
            const error = new Error('A driver could not be found.');
            error.statusCode = 500;
            error.success = false;
            throw error;
        }
        const car = await driver.createCar({
            brand,
            model,
            year,
            run
        });
        res.status(200).json({ message: 'Car created!', success: true, car });
    } catch (error) {
        error505(error, next);
    }
};

exports.getCar = async (req, res, next) => {
    const { userId } = req;
    const { carId } = req.params;
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            const error = new Error('A user could not be found.');
            error.statusCode = 401;
            error.success = false;
            throw error;
        }
        const driver = await Driver.findOne({ where: { id: user.driverId } });
        if (!driver) {
            const error = new Error('A driver could not be found.');
            error.statusCode = 500;
            error.success = false;
            throw error;
        }
        if (driver.carId !== carId) {
            const error = new Error('Driver could not load another car.');
            error.statusCode = 500;
            error.success = false;
            throw error;
        }
        const car = await Car.findOne({ where: { id: carId } });
        if (!car) {
            const error = new Error('A car could not be found.');
            error.statusCode = 500;
            error.success = false;
            throw error;
        }
        res.status(200).json({ message: 'Car found!', success: true, car });
    } catch (error) {
        error505(error, next);
    }
};
