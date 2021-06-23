const Adoption = require('./Adoption');
const Food = require('./Food');
const Lost_Animal = require('./Lost_Animal');
const Users = require('./Users');

// Adaption-User relationship
Users.hasMany(Adoption,{
    foreignKey: 'user_id',
});

Adoption. belongsTo(Users, {
    foreignKey: 'user_id',
});

// Lost_Animal-User relationship
Users.hasMany(Lost_Animal,{
    foreignKey: 'user_id',
});

Lost_Animal.belongsTo(Users, {
    foreignKey: 'user_id',
});

// Food-User relationship
Users.hasMany(Food,{
    foreignKey: 'user_id',
});

Food.belongsTo(Users, {
    foreignKey: 'user_id',
});

module.exports = { Adoption, Lost_Animal, Food, Users };