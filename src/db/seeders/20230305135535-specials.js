'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return await queryInterface.bulkInsert('Specials', [
      {
        title: 'Valentines Wellington',
        link: 'https://thebutchersmarketmeatanddeli.godaddysites.com/order-online/ols/categories/valentines',
        displayOrder: 1,
        imageUrl: 'fb49d125-ae66-492f-b448-88917dacd077.jpg',
        imageAltText: 'Valentines Wellington',
        isSoldOut: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Valentines Steak',
        link: 'https://thebutchersmarketmeatanddeli.godaddysites.com/order-online/ols/categories/valentines',
        displayOrder: 2,
        imageUrl: '66ac9c74-c5a2-4ea5-a140-bdbfd4d613d0.jpg',
        imageAltText: 'Valentines Steak',
        isSoldOut: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Valentines Shrimp',
        link: 'https://thebutchersmarketmeatanddeli.godaddysites.com/order-online/ols/categories/valentines',
        displayOrder: 3,
        imageUrl: '861888a9-dd9b-43a9-808f-a56a33ac4cbc.jpg',
        imageAltText: 'Valentines Shrimp',
        isSoldOut: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Valentines Steak & Lobster',
        link: 'https://thebutchersmarketmeatanddeli.godaddysites.com/order-online/ols/categories/valentines',
        displayOrder: 4,
        imageUrl: '1c2cb5af-145e-4e6f-bb45-d9b495cb391a.jpg',
        imageAltText: 'Valentines Steak & Lobster',
        isSoldOut: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Valentines Steak & Shrimp',
        link: 'https://thebutchersmarketmeatanddeli.godaddysites.com/order-online/ols/categories/valentines',
        displayOrder: 5,
        imageUrl: '9540cfbd-7556-49ad-896e-c58a09b18836.jpg',
        imageAltText: 'Valentines Steak & Shrimp',
        isSoldOut: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Meatloaf & Twice Baked Potatoes',
        link: 'https://thebutchersmarketmeatanddeli.godaddysites.com/order-online/ols/products/bbq-sandwich-meal-bbq-snd-ml1',
        displayOrder: 6,
        imageUrl: 'd1622086-5a99-42e8-95d9-5d37269b8e64.jpg',
        imageAltText: 'Meatloaf & Potatoes',
        isSoldOut: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'BBQ Sandwich Meal',
        link: 'https://thebutchersmarketmeatanddeli.godaddysites.com/order-online/ols/products/bbq-sandwich-meal',
        displayOrder: 7,
        imageUrl: 'b17fad98-6117-4d87-ac54-6f09a0e3db40.jpg',
        imageAltText: 'BBQ Sandwich Meal',
        isSoldOut: false,
        isHidden: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('Menus', null, {});
  },
};
