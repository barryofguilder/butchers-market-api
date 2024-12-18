'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
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

  async down(queryInterface) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('PackageBundles', 'fileUrl', { transaction: t }),
      ]);
    });
  },
};
