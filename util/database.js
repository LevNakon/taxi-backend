const Sequelize = require('sequelize');

// const sequelize = new Sequelize('root', 'root', 'root',
//     {
//         host: 'localhost',
//         dialect: 'postgres'
//     });

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    dialectOptions: {
        ssl: true
    }
});

module.exports = sequelize;