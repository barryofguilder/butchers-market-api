'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn('Specials', 'inStock', {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        transaction: t,
      });
      await queryInterface.bulkUpdate(
        'Specials',
        {
          inStock: true,
        },
        {
          isSoldOut: false,
        }
      );
      await queryInterface.bulkUpdate(
        'Specials',
        {
          inStock: false,
        },
        {
          isSoldOut: true,
        }
      );
      await queryInterface.removeColumn('Specials', 'isSoldOut', { transaction: t });
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn('Specials', 'isSoldOut', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        transaction: t,
      });
      await queryInterface.bulkUpdate(
        'Specials',
        {
          isSoldOut: false,
        },
        {
          inStock: true,
        }
      );
      await queryInterface.bulkUpdate(
        'Specials',
        {
          isSoldOut: true,
        },
        {
          inStock: false,
        }
      );
      await queryInterface.removeColumn('Specials', 'inStock', { transaction: t });
    });
  },
};
