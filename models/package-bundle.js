const createModel = (sequelize, DataTypes) => {
  const PackageBundle = sequelize.define('PackageBundle', {
    displayOrder: DataTypes.INTEGER,
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    flyerDownloadLink: DataTypes.STRING,
    prices: DataTypes.STRING,
    items: DataTypes.TEXT,
  });

  return PackageBundle;
};

export default createModel;
