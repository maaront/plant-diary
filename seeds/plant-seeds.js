const { Plant } = require('../models');

const plantData = [
  {
    common_name: 'Prickly rose',
    scientific_name: 'Rosa acicularis',
    user_id: 1,
    image_url: "https://bs.plantnet.org/image/o/1c83e8eca87f4edeeb98ea96f6308d6d65add266",
    group: "indoor"
  },
  {
    common_name: 'Lemon day-lily',
    scientific_common_name: 'Hemerocallis lilioasphodelus',
    user_id: 1,
    image_url: "https://bs.plantnet.org/image/o/b82e172ed48e8bdcaa889ab5ec320806dc01b5f0",
    group: "outdoor"
  },
  {
    common_name: 'Heartleaf rosemallow',
    scientific_name: 'Hibiscus martianus',
    user_id: 1,
    image_url: "https://bs.plantnet.org/image/o/e74c40baa95ffe0369e34676f637ca566e56e07a",
    group: "outdoor"
  },
];

const seedPlants = () => Plant.bulkCreate(plantData);

module.exports = seedPlants;
