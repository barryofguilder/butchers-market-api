export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.createTable('Specials', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      imageAltText: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      activeStartDate: {
        type: Sequelize.DATE,
      },
      activeEndDate: {
        type: Sequelize.DATE,
      },
      isSoldOut: {
        type: Sequelize.BOOLEAN,
      },
      isHidden: {
        type: Sequelize.BOOLEAN,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    return await queryInterface.dropTable('Specials');
  },
};
