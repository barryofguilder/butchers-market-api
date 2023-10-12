const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const DeliItem = sequelize.define('DeliItem', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ingredients: Sequelize.STRING,
    isHidden: Sequelize.BOOLEAN,
    imageUrl: Sequelize.STRING,
  });

  return DeliItem;
};
