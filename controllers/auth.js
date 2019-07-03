const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { error505 } = require('../util/error');

exports.signup = async (req, res, next) => {
    const { firstName, lastName, gender, email, password } = req.body;
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed!');
            error.statusCode = 422;
            error.success = false;
            throw error;
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ firstName, lastName, gender, email, password: hashedPassword });
        res.status(201).json({ message: 'User created!', success: true });
    } catch (error) {
        error505(error, next);
    }
};

exports.signin = async (req, res, next) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            const error = new Error('Validation failed!');
            error.statusCode = 422;
            error.success = false;
            throw error;
        }
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            error.success = false;
            throw error;
        }
        const { id } = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password.');
            error.statusCode = 401;
            error.success = false;
            throw error;
        }
        const token = jwt.sign(
            {
                email: user.email,
                userId: id
            },
            'lev_nakonechnyy_token_key',
            { expiresIn: '24h' });
        res.status(200).json({ message: 'Sign In successful!', success: true, token, userId: id });
        return;
    } catch (error) {
        error505(error, next);
        return error;
    }

};