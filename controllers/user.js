const { validationResult } = require('express-validator/check');

const User = require('../models/user');
const { error505 } = require('../util/error');

exports.userGet = async (req, res, next) => {
    const { userId } = req;
    try {
        const user = await User.findOne({ where: { id: userId } });
        if (!user) {
            const error = new Error('A user could not be found.');
            error.statusCode = 401;
            error.success = false;
            throw error;
        }
        res.status(200).json({ message: 'User found!', success: true, user });
    } catch (error) {
        error505(error, next);
        return error;
    }
};

exports.userUpdate = async (req, res, next) => {
    const { userId } = req;
    const { firstName, lastName, email, birthdayDate, mobileNumber, homeAddress, workAddress } = req.body;
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
        user.firstName = firstName;
        user.lastName = lastName;
        user.email = email;
        user.birthdayDate = birthdayDate === '' ? null : birthdayDate;
        user.mobileNumber = mobileNumber === '' ? null : mobileNumber;
        user.homeAddress = homeAddress === '' ? null : homeAddress;
        user.workAddress = workAddress === '' ? null : workAddress;
        await user.save();
        res.status(201).json({ message: 'User updated!', success: true });
    } catch (error) {
        error505(error, next);
        return error;
    }
};