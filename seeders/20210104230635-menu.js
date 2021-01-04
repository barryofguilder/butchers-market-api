export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Menus', [
      {
        fileUrl: 'bmmenu.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Menus', null, {});
  },
};
