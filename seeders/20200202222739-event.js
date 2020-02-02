export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Events', [
      {
        title: 'Game Day! UGA vs. UF',
        leadIn: null,
        description: null,
        startTime: new Date(2017, 9, 29, 18, 0, 0),
        endTime: new Date(2017, 9, 29, 22, 0, 0),
        link: null,
      },
      {
        title: 'Luke Simmons & Kolby Towe',
        leadIn: 'Acoustic Blues & Soul with',
        description: null,
        startTime: new Date(2020, 0, 4, 19, 0, 0),
        endTime: new Date(2020, 0, 4, 22, 0, 0),
        link: 'https://www.youtube.com/watch?v=8ODVyWKIZMw',
      },
      {
        title: 'Rosedale Remedy',
        leadIn: null,
        description: null,
        startTime: new Date(2020, 0, 11, 19, 0, 0),
        endTime: new Date(2020, 0, 11, 22, 0, 0),
        link: null,
      },
      {
        title: 'The Outsiders',
        leadIn: null,
        description: null,
        startTime: new Date(2020, 0, 18, 19, 0, 0),
        endTime: new Date(2020, 0, 18, 22, 0, 0),
        link: 'https://www.youtube.com/watch?v=8ODVyWKIZMw',
      },
      {
        title: 'The House Band',
        leadIn: null,
        description: null,
        startTime: new Date(2020, 0, 25, 19, 0, 0),
        endTime: new Date(2020, 0, 25, 22, 0, 0),
        link: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Events', null, {});
  },
};
