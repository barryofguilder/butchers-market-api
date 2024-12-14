const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const GrabAndGo = sequelize.define('GrabAndGo', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    isSoldOut: Sequelize.BOOLEAN,
  });

  return GrabAndGo;
};
