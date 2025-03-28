'use strict';
const { Sequelize, DataTypes } = require('sequelize')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'OTP', { type: DataTypes.STRING });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('Users', 'OTP', {
      type: DataTypes.INTEGER,
    });
  }
};
