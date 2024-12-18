'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    return await queryInterface.bulkInsert('DeliItems', [
      {
        title: 'Rotisserie Chicken Salad',
        ingredients: 'grapes, pecans',
        imageUrl: 'rotisserie.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Smokehouse Chicken Salad',
        imageUrl: 'smokehouse-chicken-salad.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Traditional Chicken Salad',
        imageUrl: 'traditional.jpg',
        ingredients: 'pimientos, tomatoes, carrots',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Olive Salad',
        imageUrl: 'olive.jpg',
        ingredients: 'assorted olives, garlic, cocktail onions, assorted peppers, pimientos',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Greek Pasta Salad',
        imageUrl: 'greek.jpg',
        ingredients: 'penne pasta, olives, tomatoes, fetta cheese, italian dressing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Italian Pasta Salad',
        imageUrl: 'italian-pasta.jpg',
        ingredients:
          'tri-color rotini pasta, pepperoni, salami, chicken, bleu cheese, mozzarella cheese, italian dressing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pimiento Cheese',
        imageUrl: 'pimento.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Fresh Salsa',
        imageUrl: 'salsa.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Broccoli Salad',
        imageUrl: 'broccoli.jpg',
        ingredients: 'broccoli, cauliflower, tomatoes, red onion, ranch dressing',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Cole Slaw',
        imageUrl: 'slaw.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Hot Slaw',
        imageUrl: 'hot-slaw.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Bacon Ranch Potato Salad',
        imageUrl: '141bb598-6c10-4e09-93e3-2dfa1f7b236d.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Corn Salad',
        imageUrl: 'corn.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Baked Beans',
        imageUrl: 'beans.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Pulled Pork BBQ',
        imageUrl: 'bbq.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Smoked Baby Back Ribs',
        imageUrl: 'ribs.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Smoked Chicken Breast',
        imageUrl: 'chicken-breast.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'Twice Baked Potatoes',
        imageUrl: 'original-potato.jpg',
        ingredients: 'milk, butter, sour cream, cheddar cheese, chives',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('DeliItems', null, {});
  },
};
