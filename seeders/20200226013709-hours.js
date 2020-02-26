export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Hours', [
      {
        type: 'Store',
        default: true,
        label: 'Store Hours',
        line1: 'Mon - Sat: 9:00am - 6:00pm',
        line2: 'Sun: Closed',
        line3: '',
      },
      {
        type: 'Cafe',
        default: true,
        label: 'Cafe Hours',
        line1: 'Mon - Thurs: 9:00am - 5:30pm',
        line2: 'Fri & Sat: 9:00am - 10:00pm, last call 9:30pm',
        line3: 'Sun: Closed',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Hours', null, {});
  },
};
