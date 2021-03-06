export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PackageBundles', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      displayOrder: {
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      flyerDownloadLink: {
        type: Sequelize.STRING,
      },
      prices: {
        type: Sequelize.STRING,
      },
      items: {
        type: Sequelize.TEXT,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('PackageBundles');
  },
};
