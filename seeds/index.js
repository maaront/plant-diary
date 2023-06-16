const seedUsers = require('./user-seeds');
const seedPlants = require('./plant-seeds');
// const seedDiary = require('./diary-seeds');


const sequelize = require('../config/connection');

const seedAll = async () => {
  // Disable foreign key checks
  await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');

  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
 
// Enable foreign key checks
await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');

  await seedUsers();
  console.log('\n----- USERS SEEDED -----\n');

  await seedPlants();
  console.log('\n----- PLANTS SEEDED -----\n');
   
  // await seedDiary();
  // console.log('\n----- DIARY SEEDED -----\n');

  process.exit(0);
};

seedAll();
