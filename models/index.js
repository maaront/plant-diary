// Models
const Plant = require("./Plant");
const Diary = require("./Diary");
const User = require("./user");

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

module.exports = { Plant, Diary, User };
