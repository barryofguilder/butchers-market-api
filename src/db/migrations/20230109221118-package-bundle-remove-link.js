export default {
  async up(queryInterface) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('PackageBundles', 'flyerDownloadLink', { transaction: t }),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'PackageBundles',
          'flyerDownloadLink',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
      ]);
    });
  },
};
