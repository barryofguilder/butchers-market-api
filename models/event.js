const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Event = sequelize.define('Event', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    leadIn: Sequelize.STRING,
    description: Sequelize.STRING,
    link: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    startTime: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    endTime: {
      type: Sequelize.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
        isGreaterThanStartTime(value) {
          if (value < this.startTime) {
            throw new Error('must be greater than start time');
          }
        },
      },
    },
  });

  return Event;
};
