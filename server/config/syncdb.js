// utils/syncdb.js
const db = require('../models');
const syncRole = require('./syncrole');
const syncBook = require('./syncbook');

const syncdb = async () => {
  try {
    await db.sequelize.sync({  }); // or { force: true } in dev
    console.log('✅ Database synced!');

    await syncRole(); // 
    await syncBook(); // 

  } catch (err) {
    console.error('❌ Sync failed:', err);
  }
};

module.exports = syncdb;
