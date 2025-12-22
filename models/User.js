const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const User = sequelize.define(
  "User",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    gender: {
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: true,
    },

    phone: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [10, 15],
      },
    },

    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },

    role: {
      type: DataTypes.ENUM("USER", "ADMIN"),
      defaultValue: "USER"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = User;
