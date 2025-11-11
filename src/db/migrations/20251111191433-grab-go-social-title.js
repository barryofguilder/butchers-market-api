'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.addColumn('GrabAndGos', 'socialTitle', {
        type: Sequelize.STRING,
        allowNull: true,
        transaction: t,
      });
    });
  },

  async down(queryInterface) {
    return await queryInterface.sequelize.transaction(async (t) => {
      await queryInterface.removeColumn('GrabAndGos', 'socialTitle', { transaction: t });
    });
  },
};
