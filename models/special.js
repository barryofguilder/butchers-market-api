const createModel = (sequelize, DataTypes) => {
  const Special = sequelize.define('Special', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imageAltText: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    activeStartDate: DataTypes.DATE,
    activeEndDate: {
      type: DataTypes.DATE,
      validate: {
        isGreaterThanStartDate(value) {
          if (this.activeStartDate && value < this.activeStartDate) {
            throw new Error('must be greater than start date');
          }
        },
      },
    },
    isSoldOut: DataTypes.BOOLEAN,
    isHidden: DataTypes.BOOLEAN,
  });

  return Special;
};

export default createModel;
