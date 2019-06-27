'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('user', [{
      firstName: 'Levko',
      lastName: 'Nako',
      email: "levnakowork@gmail.com",
      password: "some_password",
      birthdayDate: "22.05.2000",
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user', null, {});
  }
};
