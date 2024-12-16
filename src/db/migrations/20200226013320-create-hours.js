export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Hours', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      type: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      default: {
        type: Sequelize.BOOLEAN,
      },
      activeStartDate: {
        type: Sequelize.DATE,
      },
      activeEndDate: {
        type: Sequelize.DATE,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      line1: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      line2: {
        type: Sequelize.STRING,
      },
      line3: {
        type: Sequelize.STRING,
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
    await queryInterface.dropTable('Hours');
  },
};
