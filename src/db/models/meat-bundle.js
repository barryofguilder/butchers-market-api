const { Sequelize } = require('sequelize');

export default (sequelize) => {
  const MeatBundle = sequelize.define('MeatBundle', {
    displayOrder: Sequelize.INTEGER,
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: Sequelize.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    featured: Sequelize.BOOLEAN,
    specialText: Sequelize.STRING,
    isHidden: Sequelize.BOOLEAN,
    orderEnabled: Sequelize.BOOLEAN,
    items: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return MeatBundle;
};
