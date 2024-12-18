import { Sequelize } from 'sequelize';

export default (sequelize) => {
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
