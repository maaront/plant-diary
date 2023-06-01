const { Diary } = require('../models');

const diaryData = [
  {
    title: 'Watering',
    content: 'Watered the plant today',
    user_id: 1,
    plant_id: 1,
  },
  {
    title: 'Repotting',
    content: 'Repotted the plant today',
    user_id: 2,
    plant_id: 2,
  },
  {
    title: 'Fertilizing',
    content: 'Fertilized the plant today',
    user_id: 3,
    plant_id: 3,
  },
];

const seedDiary = () => Diary.bulkCreate(diaryData);

module.exports = seedDiary;
