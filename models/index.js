'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
require('dotenv').config();

const db = {};

// ✅ Sequelize initialize FIRST
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    logging: false
  }
);

// ✅ Load all models AFTER sequelize exists
db.User = require('./User')(sequelize, Sequelize.DataTypes);
db.Address = require('./Address')(sequelize, Sequelize.DataTypes);
db.Category = require('./admin/category')(sequelize, Sequelize.DataTypes);
db.Product = require('./admin/Product')(sequelize, Sequelize.DataTypes);
db.ProductImage = require('./admin/productImage')(sequelize, Sequelize.DataTypes);
db.Pan = require('./Pan')(sequelize, Sequelize.DataTypes);


// ✅ Associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// ✅ Export
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
