export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('Hours', [
      {
        type: 'Store',
        default: true,
        label: 'Store Hours',
        activeStartDate: null,
        activeEndDate: null,
        line1: 'Mon - Sat: 9:00am - 6:00pm',
        line2: 'Sun: Closed',
        line3: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Cafe',
        default: true,
        label: 'Cafe Hours',
        activeStartDate: null,
        activeEndDate: null,
        line1: 'Mon: Closed',
        line2: 'Tues - Sat: 10:30am - 5:30pm',
        line3: 'Sun: Closed',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Store',
        default: false,
        label: 'Christmas Week 2022',
        activeStartDate: new Date('2022-12-20T05:00:00.000Z'),
        activeEndDate: new Date('2023-01-04T04:59:59.000Z'),
        line1: 'Normal Hours: Mon - Sat | 9am - 6pm',
        line2: 'Christmas Eve: 9am - 2pm | Closed 12.26 - 12.27',
        line3: 'New Years Eve: 9am - 2pm | Closed 1.2 - 1.3',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        type: 'Cafe',
        default: false,
        label: 'Christmas Week 2022',
        activeStartDate: new Date('2021-12-20T05:00:00.000Z'),
        activeEndDate: new Date('2023-01-03T04:59:59.000Z'),
        line1: 'Normal Hours: Tues - Sat | 10:30 - 5:30',
        line2: 'Christmas Week: Closed 12.23 - 12.24',
        line3: 'Will remain closed 12.24 - 1.9',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('Hours', null, {});
  },
};
