const { Plant } = require('../models');

const plantData = [
  {
    name: 'Rose',
    description: 'A beautiful flower',
    user_id: 1,
  },
  {
    name: 'Poison Ivy',
    description: 'A dangerous plant',
    user_id: 2,
  },
  {
    name: 'Cactus',
    description: 'A prickly plant',
    user_id: 3,
  },
];

const seedPlants = () => Plant.bulkCreate(plantData);

module.exports = seedPlants;
