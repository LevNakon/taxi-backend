const Sequelize = require('sequelize');

// const sequelize = require('../util/database');
const db = require('../models');

const Driver = db.sequelize.define('driver', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    experience: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    condition: {
        type: Sequelize.STRING,
        allowNull: false
    }
},
    {
        tableName: "driver",
        freezeTableName: true
    });

module.exports = Driver;