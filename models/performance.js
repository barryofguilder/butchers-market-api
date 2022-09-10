const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Performance = sequelize.define('Performance', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    link: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Performance;
};
