const sequelize = require('../config/connection');

const { Food, Users, Adoption, Lost_Animal } = require('../models');

const foodSeedData = require('./foodSeedData.json');
const usersSeedData = require('./usersSeedData.json');
const adoptionData = require('./adaptionData.json');
const lost_animalData = require('./lost_animalData.json');


const seedDatabase = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log("err")
    await Users.bulkCreate(usersSeedData);
    await Food.bulkCreate(foodSeedData);
    await Adoption.bulkCreate(adoptionData);
    await Lost_Animal.bulkCreate(lost_animalData);
  }
  catch (err) { console.log(err) }


  process.exit(0);
};

seedDatabase();
