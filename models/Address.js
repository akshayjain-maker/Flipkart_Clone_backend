const { DataTypes } = require("sequelize");
const { sequelize } = require("../config/db");

const Address = sequelize.define("Address", {
  userId: {                   // <-- add this
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pincode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  locality: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  landmark: {
    type: DataTypes.STRING,
  },
  alternatePhone: {
    type: DataTypes.STRING,
  },
  addressType: {
    type: DataTypes.ENUM("HOME", "WORK"),
    defaultValue: "HOME",
  }
});

module.exports = Address;
