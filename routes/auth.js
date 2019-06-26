const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

/**
 * PUT /auth/signup create or update user
 */
router.put('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ where: { email: value } })
                .then(user => {
                    if (user) {
                        return Promise.reject('Email address already exists!');
                    }
                });
        })
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 5 }),
    body('firstName')
        .trim()
        .not()
        .isEmpty(),
    body('lastName')
        .trim()
        .not()
        .isEmpty(),
    body('birthdayDate')
        .trim()
        .not()
        .isEmpty()

], authController.signup);


/**
 * POST /auth/login
 */
router.post('/login', authController.login);

module.exports = router;