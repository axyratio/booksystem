const fs = require('fs');
const path = require('path');
const sequelize = require('../config/db'); // 🔁 ดึงจาก db.js
const { DataTypes } = require('sequelize');

const db = {};

// โหลด models
fs.readdirSync(__dirname)
  .filter(file => file !== 'index.js' && file.endsWith('.js'))
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// เชื่อม association
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
module.exports = db;
