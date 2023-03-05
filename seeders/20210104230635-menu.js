export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Menus', [
      {
        fileUrl: 'menu10.8.22_20221008.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Menus', null, {});
  },
};
