"use strict";
const moment = require("moment");
const { Sequelize, DataTypes, ENUM } = require("sequelize");

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Users", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(255),
        allowNull: true,
      },
      lastName: {
        type: DataTypes.STRING(255),
        allowNull: true
      },
      email: {
        type: DataTypes.STRING(255),
        allowNull: false
      },
      password: {
        type: DataTypes.STRING(255),
        validate: { len: [8, 14] }
      },
      profileImage: {
        type: DataTypes.STRING(255)
      },
      role: {
        type: DataTypes.ENUM("user", "merchant")
      },
      createdAt: {
        type: DataTypes.DATE,
        defaultValue: moment().format(),
      },
      UpdatedAt: {
        type: DataTypes.DATE, allowNull: true,
      },
      isDeleted: {
        type: DataTypes.BOOLEAN, defaultValue: false
      },
      deleteAt: {
        type: DataTypes.DATE,
        allowNull: true
      },
      OTP: {
        type: DataTypes.INTEGER,
        defaultValue: null
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Users");
  },
};
