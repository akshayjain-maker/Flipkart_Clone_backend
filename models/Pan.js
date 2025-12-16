const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Pan = sequelize.define('Pan', {
  panNumber: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: { 
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Pan;
