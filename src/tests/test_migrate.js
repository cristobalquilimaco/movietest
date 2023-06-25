const sequelize = require('../utils/connection');
require('../models/Actor');
require('../models');

const main = async () => {
  try {
    await sequelize.sync({ force: true });
    console.log('Database synchronized successfully.');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

main();