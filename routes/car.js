const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');
const carController = require('../controllers/car');

const router = express.Router();

/**
 * POST /car/create
 */
router.post('/create', isAuth, [
    body('brand')
        .trim()
        .not()
        .isEmpty(),
    body('model')
        .trim()
        .not()
        .isEmpty(),
    body('year')
        .trim()
        .not()
        .isEmpty(),
    body('run')
        .trim()
        .not()
        .isEmpty()
], carController.createCar);

/**
 * GET /car/:carId
 */
router.get('/:carId', isAuth, carController.getCar);

module.exports = router;