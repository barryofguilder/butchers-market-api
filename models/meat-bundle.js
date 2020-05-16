const createModel = (sequelize, DataTypes) => {
  const MeatBundle = sequelize.define('MeatBundle', {
    displayOrder: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    featured: DataTypes.BOOLEAN,
    isHidden: DataTypes.BOOLEAN,
    items: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  });

  return MeatBundle;
};

export default createModel;
