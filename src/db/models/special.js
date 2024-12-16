const { Sequelize } = require('sequelize');

export default (sequelize) => {
  const Special = sequelize.define('Special', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    link: Sequelize.STRING,
    displayOrder: Sequelize.INTEGER,
    imageUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageAltText: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
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
    inStock: Sequelize.BOOLEAN,
    isHidden: Sequelize.BOOLEAN,
  });

  return Special;
};
