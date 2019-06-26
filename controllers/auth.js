const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const { error505 } = require('../util/error');

exports.signup = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const error = new Error('Validation failed!');
        error.statusCode = 422;
        error.data = errors.array();
        throw error;
    }
    const { email, firstName, lastName, birthdayDate, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({ email, firstName, lastName, birthdayDate, password: hashedPassword });
        res.status(201).json({ message: 'User created!', userId: user.id });
    } catch (err) {
        error505(err, next);
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
            const error = new Error('A user with this email could not be found.');
            error.statusCode = 401;
            throw error;
        }
        const { id } = user;
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
            const error = new Error('Wrong password.');
            error.statusCode = 401;
            throw error;
        }
        const token = jwt.sign(
            {
                email: user.email,
                userId: id
            },
            'lev_nakonechnyy_token_key',
            { expiresIn: '2h' });
        res.status(200).json({ token, userId: id });
    } catch (err) {
        error505(err, next);
    }

};