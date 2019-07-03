const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const authController = require('../controllers/auth');

const router = express.Router();

/**
 * POST /auth/signup
 */
router.post('/signup', [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value) => {
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
        .isLength({ min: 6 }),
    body('firstName')
        .trim()
        .not()
        .isEmpty(),
    body('lastName')
        .trim()
        .not()
        .isEmpty(),
    body('gender')
        .trim()
        .not()
        .isEmpty()

], authController.signup);


/**
 * POST /auth/signin
 */
router.post('/signin', [
    body('email')
        .isEmail()
        .normalizeEmail(),
    body('password')
        .trim()
        .isLength({ min: 6 })
], authController.signin);

module.exports = router;