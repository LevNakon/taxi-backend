const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Car = sequelize.define('car', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    brand: {
        type: Sequelize.STRING,
        allowNull: false
    },
    model: {
        type: Sequelize.STRING,
        allowNull: false
    },
    year: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    run: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
},
    {
        tableName: "car",
        freezeTableName: true
    });

module.exports = Car;