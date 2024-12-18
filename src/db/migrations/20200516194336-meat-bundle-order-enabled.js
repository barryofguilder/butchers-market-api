'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'MeatBundles',
          'orderEnabled',
          {
            type: Sequelize.DataTypes.BOOLEAN,
            defaultValue: true,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface) {
    return await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('MeatBundles', 'orderEnabled', { transaction: t }),
      ]);
    });
  },
};
