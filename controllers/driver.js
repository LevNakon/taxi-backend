const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const Driver = require('../models/driver');
const { error505 } = require('../util/error');

exports.createDriver = async (req, res, next) => {
    const { userId } = req;
    const { experience, condition } = req.body;
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
        const driver = await user.createDriver({
            experience,
            condition
        });
        res.status(200).json({ message: 'Driver created!', success: true, driver });
    } catch (error) {
        error505(error, next);
    }
};

exports.updateDriver = async (req, res, next) => {
    const { userId } = req;
    const { experience, condition, driverId } = req.body;
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
        if(user.driverId != driverId){
            const error = new Error('User could not update another driver.');
            error.statusCode = 500;
            error.success = false;
            throw error;
        }
        const driver = await Driver.findOne({ where: { id: driverId } });
        if (!driver) {
            const error = new Error('A driver could not be found.');
            error.statusCode = 500;
            error.success = false;
            throw error;
        }
        driver.experience = experience;
        driver.condition = condition;
        await driver.save();
        res.status(200).json({ message: 'Driver updated!', success: true, driver });
    } catch (error) {
        error505(error, next);
    }
};

exports.getDriver = async (req, res, next) => {
    const { userId } = req;
    const { driverId } = req.params;
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            const error = new Error('A user could not be found.');
            error.statusCode = 401;
            error.success = false;
            throw error;
        }
        if(user.driverId != driverId){
            const error = new Error('User could not load another driver.');
            error.statusCode = 500;
            error.success = false;
            throw error;
        }
        const driver = await Driver.findOne({ where: { id: driverId } });
        if (!driver) {
            const error = new Error('A driver could not be found.');
            error.statusCode = 500;
            error.success = false;
            throw error;
        }
        res.status(200).json({ message: 'Driver found!', success: true, driver });
    } catch (error) {
        error505(error, next);
    }
};