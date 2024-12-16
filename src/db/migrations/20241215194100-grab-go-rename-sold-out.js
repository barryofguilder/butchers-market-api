export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn('GrabAndGos', 'inStock', {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
        transaction: t,
      });
      await queryInterface.bulkUpdate(
        'GrabAndGos',
        {
          inStock: true,
        },
        {
          isSoldOut: false,
        }
      );
      await queryInterface.bulkUpdate(
        'GrabAndGos',
        {
          inStock: false,
        },
        {
          isSoldOut: true,
        }
      );
      await queryInterface.removeColumn('GrabAndGos', 'isSoldOut', { transaction: t });
    });
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn('GrabAndGos', 'isSoldOut', {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        transaction: t,
      });
      await queryInterface.bulkUpdate(
        'GrabAndGos',
        {
          isSoldOut: false,
        },
        {
          inStock: true,
        }
      );
      await queryInterface.bulkUpdate(
        'GrabAndGos',
        {
          isSoldOut: true,
        },
        {
          inStock: false,
        }
      );
      await queryInterface.removeColumn('GrabAndGos', 'inStock', { transaction: t });
    });
  },
};
