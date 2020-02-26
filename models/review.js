const createModel = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    reviewer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    imageUrl: DataTypes.STRING,

    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    source: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },

    url: DataTypes.STRING,
  });

  return Review;
};

export default createModel;
