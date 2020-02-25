const createModel = (sequelize, DataTypes) => {
  const DeliItem = sequelize.define('DeliItem', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    ingredients: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
  });

  return DeliItem;
};

export default createModel;
