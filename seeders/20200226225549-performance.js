export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Performances', [
      {
        title: "Luke Simmons & Kolby Towe - I Don't Need No Doctor",
        link: 'https://www.youtube.com/watch?v=8ODVyWKIZMw',
      },
      {
        title: 'Luke Simmons - Lights',
        link: 'https://www.youtube.com/watch?v=8cfi5r_7qps',
      },
      {
        title: 'Lon Eldridge - Georgia On My Mind',
        link: 'https://www.youtube.com/watch?v=El53X1plbSY',
      },
      {
        title: 'Lon Eldridge',
        link: 'https://www.youtube.com/watch?v=yDYxlQHpjFE',
      },
      {
        title: 'Lon Eldridge - Handy Man',
        link: 'https://www.youtube.com/watch?v=r7A_fe4LH-o',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Performances', null, {});
  },
};
