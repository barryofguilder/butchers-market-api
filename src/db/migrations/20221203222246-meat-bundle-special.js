export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'MeatBundles',
          'specialText',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface) {
    return await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('MeatBundles', 'specialText', { transaction: t }),
      ]);
    });
  },
};
