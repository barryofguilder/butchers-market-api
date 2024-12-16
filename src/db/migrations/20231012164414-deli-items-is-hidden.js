export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'DeliItems',
          'isHidden',
          {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface) {
    return await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('DeliItems', 'isHidden', { transaction: t }),
      ]);
    });
  },
};
