const createModel = (sequelize, DataTypes) => {
  const Hour = sequelize.define('Hour', {
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    default: DataTypes.BOOLEAN,
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
    label: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    line1: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    line2: DataTypes.STRING,
    line3: DataTypes.STRING,
  });

  return Hour;
};

export default createModel;
