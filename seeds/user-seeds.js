const { User } = require('../models');

const userData = [
  {
    user_name: 'Matt Turner',
    user_email: 'mt@gmail.com',
    password: 'password123'
  },
  {
    user_name: 'Claudia Gillota',
    user_email: "cg@hmail.com",
    password: "password123"
  },
  {
    user_name: 'Dan Kopac',
    user_email: "dk@hmail.com",
    password: "password123"
  },
];

const seedUsers = () => User.bulkCreate(userData);

module.exports = seedUsers;
