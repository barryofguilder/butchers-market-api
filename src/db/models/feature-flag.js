const { Sequelize } = require('sequelize');

export default (sequelize) => {
  const FeatureFlag = sequelize.define('FeatureFlag', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    active: Sequelize.BOOLEAN,
  });

  return FeatureFlag;
};
