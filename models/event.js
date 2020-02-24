const createModel = (sequelize, DataTypes) => {
  const Event = sequelize.define('Event', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    leadIn: DataTypes.STRING,
    description: DataTypes.STRING,
    link: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    endTime: {
      type: DataTypes.DATE,
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

export default createModel;
