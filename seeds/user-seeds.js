const { User } = require('../models');

const userData = [
  {
    user_name: 'Matt Turner',
    user_password: 'password123'
  },
  {
    user_name: 'Claudia Gillota',
    user_password: "password123"
  },
  {
    user_name: 'Dan Kopac',
    user_password: "password123"
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
