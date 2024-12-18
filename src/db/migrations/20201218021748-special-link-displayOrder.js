'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Specials',
          'link',
          {
            type: Sequelize.DataTypes.STRING,
          },
          { transaction: t }
        ),
        queryInterface.addColumn(
          'Specials',
          'displayOrder',
          {
            type: Sequelize.DataTypes.INTEGER,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface) {
    return await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.removeColumn('Specials', 'link', { transaction: t }),
        queryInterface.removeColumn('Specials', 'displayOrder', { transaction: t }),
      ]);
    });
  },
};
