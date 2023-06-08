// Models
const User = require("./User");
const Plant = require("./Plant");
const Diary = require("./Diary");


// Associations
User.hasMany(Plant, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Plant.belongsTo(User, {
  foreignKey: "user_id",
});

User.hasMany(Diary, {
  foreignKey: "user_id",
  onDelete: "CASCADE",
});

Diary.belongsTo(User, {
  foreignKey: "user_id",
});

module.exports = { User, Plant, Diary };

