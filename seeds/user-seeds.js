const { User } = require('../models');

const userData = [
  {
    user_name: 'Matt Turner',
  },
  {
    user_name: 'Claudia Gillota',
  },
  {
    user_name: 'Dan Kopac',
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
