const sequelize = require('../config/connection');
const { Adoption, Lost_Animal } = require('../models');

const adoptionData = require('./adaptionData.json');
const lost_animalData = require('./lost_animalData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Adoption.bulkCreate(adoptionData);
  await Lost_Animal.bulkCreate(lost_animalData);

  process.exit(0);
};

seedDatabase();
