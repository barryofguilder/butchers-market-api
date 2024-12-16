import { Sequelize } from 'sequelize';

export default (sequelize) => {
  const GrabAndGo = sequelize.define('GrabAndGo', {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    description: Sequelize.STRING,
    imageUrl: Sequelize.STRING,
    inStock: Sequelize.BOOLEAN,
  });

  return GrabAndGo;
};
