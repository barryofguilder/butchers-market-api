const { Sequelize } = require('sequelize');

export default (sequelize) => {
  const Menu = sequelize.define('Menu', {
    fileUrl: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    updatedAt: Sequelize.DATE,
  });

  return Menu;
};
