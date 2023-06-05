const { Plant } = require('../models');

const plantData = [
  {
    common_name: 'Prickly rose',
    scientific_name: 'Rosa acicularis',
    user_id: 1,
  },
  {
    common_name: 'Lemon day-lily',
    scientific_common_name: 'Hemerocallis lilioasphodelus',
    user_id: 2,
  },
  {
    common_name: 'Heartleaf rosemallow',
    scientific_name: 'Hibiscus martianus',
    user_id: 3,
  },
];

const seedPlants = () => Plant.bulkCreate(plantData);

module.exports = seedPlants;
