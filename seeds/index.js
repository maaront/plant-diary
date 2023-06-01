const seedPlants = require('./plant-seeds');
const seedDiary = require('./diary-seeds');
const seedUsers = require('./user-seeds');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedPlants();
  console.log('\n----- PLANTS SEEDED -----\n');

  await seedDiary();
  console.log('\n----- DIARY SEEDED -----\n');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  process.exit(0);
};

seedAll();
