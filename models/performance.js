const createModel = (sequelize, DataTypes) => {
  const Performance = sequelize.define('Performance', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return Performance;
};

export default createModel;
