const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Trip = sequelize.define('trip', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    startAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    endAddress: {
        type: Sequelize.STRING,
        allowNull: false
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false
    }
},
    {
        tableName: "trip",
        freezeTableName: true
    });

module.exports = Trip;