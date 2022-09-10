const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const PackageBundle = sequelize.define('PackageBundle', {
    displayOrder: Sequelize.INTEGER,
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fileUrl: Sequelize.STRING,
    specialText: Sequelize.STRING,
    prices: Sequelize.STRING,
    items: Sequelize.TEXT,
  });

  return PackageBundle;
};
