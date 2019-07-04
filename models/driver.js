const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Driver = sequelize.define('driver', {
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
    },
    online: {
        type: Sequelize.BOOLEAN,
    }
},
    {
        tableName: "driver",
        freezeTableName: true
    });

module.exports = Driver;