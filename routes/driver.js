const express = require('express');
const { body } = require('express-validator/check');

const isAuth = require('../middleware/is-auth');
const driverController = require('../controllers/driver');

const router = express.Router();

/**
 * POST /driver/create
 */
router.post('/create', isAuth, [
    body('experience')
        .trim()
        .not()
        .isEmpty(),
    body('condition')
        .trim()
        .not()
        .isEmpty()
], driverController.createDriver);

/**
 * PUT /driver/update
 */
router.put('/update', isAuth, [
    body('experience')
        .trim()
        .not()
        .isEmpty(),
    body('condition')
        .trim()
        .not()
        .isEmpty()
], driverController.updateDriver);

/**
 * GET /driver/:driverId
 */
router.get('/:driverId', isAuth, driverController.getDriver);

module.exports = router;