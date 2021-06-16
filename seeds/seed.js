const sequelize = require('../config/connection');
const { Example } = require('../models');

const exampleData = require('./exampleData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await Example.bulkCreate(exampleData);

  process.exit(0);
};

seedDatabase();
