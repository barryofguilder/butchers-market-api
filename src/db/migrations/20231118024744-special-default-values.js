export default {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.sequelize.query(
          'UPDATE public."Specials" SET "isSoldOut"=false WHERE "isSoldOut" IS NULL',
          { transaction: t }
        ),
        queryInterface.sequelize.query(
          'UPDATE public."Specials" SET "isHidden"=false WHERE "isHidden" IS NULL',
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'Specials',
          'isSoldOut',
          {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'Specials',
          'isHidden',
          {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: false,
          },
          { transaction: t }
        ),
      ]);
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'Specials',
          'isSoldOut',
          {
            type: Sequelize.BOOLEAN,
          },
          { transaction: t }
        ),
        queryInterface.changeColumn(
          'Specials',
          'isHidden',
          {
            type: Sequelize.BOOLEAN,
          },
          { transaction: t }
        ),
      ]);
    });
  },
};
