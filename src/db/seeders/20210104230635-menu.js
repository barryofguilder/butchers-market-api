export default {
  async up(queryInterface) {
    return await queryInterface.bulkInsert('Menus', [
      {
        fileUrl: 'menu10.8.22_20221008.pdf',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Menus', null, {});
  },
};
