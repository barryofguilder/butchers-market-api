export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'PackageBundles',
          'fileUrl',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn('PackageBundles', 'fileUrl', { transaction: t }),
    ]);
  },
};
