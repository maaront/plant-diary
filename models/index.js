// Models
const User = require("./User");
const Plant = require("./Plant");
const Diary = require("./Diary");
const User = require("./User");

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
//module.exports = { Plant, Diary, User };
