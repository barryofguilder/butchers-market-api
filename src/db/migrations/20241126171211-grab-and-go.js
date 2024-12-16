export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('GrabAndGos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
      },
      imageUrl: {
        type: Sequelize.STRING,
      },
      featured: {
        type: Sequelize.BOOLEAN,
      },
      isSoldOut: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        type: Sequelize.DATE,
      },
      updatedAt: {
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('GrabAndGos');
  },
};
