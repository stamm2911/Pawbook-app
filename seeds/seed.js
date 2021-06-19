const sequelize = require('../config/connection');
const { Food, Users } = require('../models');

const foodSeedData = require('./foodSeedData.json');
const usersSeedData = require('./usersSeedData.json');

const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("err")
    await Users.bulkCreate(usersSeedData);
    await Food.bulkCreate(foodSeedData);
  }
  catch (err) { console.log(err) }



  process.exit(0);
};

seedDatabase();
