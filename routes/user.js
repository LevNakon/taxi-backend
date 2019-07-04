const express = require('express');
const { body } = require('express-validator/check');

const User = require('../models/user');
const isAuth = require('../middleware/is-auth');
const userController = require('../controllers/user');

const router = express.Router();

/**
 * GET /user/info
 */
router.get('/info', isAuth, userController.userGet);

/**
 * PUT /user/update
 */
router.put('/update',isAuth, [
    body('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
            return User.findOne({ where: { email: value } })
                .then(user => {
                    console.log(user.id,req.userId);
                    if (user.id !== req.userId) {
                        return Promise.reject('Email address already exists!');
                    }
                });
        })
        .normalizeEmail(),
    body('firstName')
        .trim()
        .not()
        .isEmpty(),
    body('lastName')
        .trim()
        .not()
        .isEmpty(),
], userController.userUpdate);

module.exports = router;
