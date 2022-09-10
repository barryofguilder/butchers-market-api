const { Sequelize } = require('sequelize');

module.exports = (sequelize) => {
  const Hour = sequelize.define('Hour', {
    type: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    default: Sequelize.BOOLEAN,
    activeStartDate: Sequelize.DATE,
    activeEndDate: {
      type: Sequelize.DATE,
      validate: {
        isGreaterThanStartDate(value) {
          if (this.activeStartDate && value < this.activeStartDate) {
            throw new Error('must be greater than start date');
          }
        },
      },
    },
    label: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    line1: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    line2: Sequelize.STRING,
    line3: Sequelize.STRING,
  });

  return Hour;
};
