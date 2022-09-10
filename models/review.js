const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Review = sequelize.define('Review', {
    reviewer: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    imageUrl: Sequelize.STRING,

    text: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    source: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    url: Sequelize.STRING,
  });

  return Review;
};
