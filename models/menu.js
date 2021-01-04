const createModel = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    fileUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    updatedAt: DataTypes.DATE,
  });

  return Menu;
};
export default createModel;
