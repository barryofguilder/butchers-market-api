'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return await queryInterface.bulkInsert('Reviews', [
      {
        reviewer: 'Sandi O',
        imageUrl: 'images/review-person1.jpg',
        text: 'Great place for quality meat and great burgers',
        source: 'Trip Advisor Contributor',
        url: 'http://tripadvisor.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewer: 'Dan Peeples',
        imageUrl: 'images/review-person2.png',
        text: 'Great place to buy meat',
        source: 'Trip Advisor Contributor',
        url: 'http://tripadvisor.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        reviewer: 'Nathan Puckett',
        imageUrl: 'images/review-person3.png',
        text: 'Quality and More Quality',
        source: 'Trip Advisor Contributor',
        url: 'http://tripadvisor.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Reviews', null, {});
  },
};
