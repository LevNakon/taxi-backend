const Sequelize = require('sequelize');

//const sequelize = require('../util/database');
const db = require('../models');

const User = db.sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    birthdayDate: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    avatarUrl: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    mobileNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    homeAddress: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    },
    workAddress: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: null
    }
},
    {
        tableName: "user",
        freezeTableName: true
    });

module.exports = User;