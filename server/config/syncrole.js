// utils/syncrole.js
const db = require('../models');

const syncRole = async () => {
  try {
    const defaultRoles = ['user', 'manager'];

    for (const role of defaultRoles) {
      const [roleInstance, created] = await db.Role.findOrCreate({
        where: { role },
        defaults: {}
      });

      if (created) {
        console.log(`✅ Role '${role}' created`);
      }
    }

    console.log('✅ Role sync complete');
  } catch (err) {
    console.error('❌ Role sync failed:', err);
  }
};

module.exports = syncRole;
