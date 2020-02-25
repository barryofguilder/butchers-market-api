export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('DeliItems', [
      {
        title: 'Rotisserie Chicken Salad',
        ingredients: 'grapes, pecans',
        imageUrl: 'rotisserie.jpg',
      },
      {
        title: 'Smokehouse Chicken Salad',
        imageUrl: 'smokehouse-chicken-salad.jpg',
      },
      {
        title: 'Traditional Chicken Salad',
        imageUrl: 'traditional.jpg',
        ingredients: 'pimientos, tomatoes, carrots',
      },
      {
        title: 'Olive Salad',
        imageUrl: 'olive.jpg',
        ingredients: 'assorted olives, garlic, cocktail onions, assorted peppers, pimientos',
      },
      {
        title: 'Greek Pasta Salad',
        imageUrl: 'greek.jpg',
        ingredients: 'penne pasta, olives, tomatoes, fetta cheese, italian dressing',
      },
      {
        title: 'Itatlian Pasta Salad',
        imageUrl: 'italian-pasta.jpg',
        ingredients:
          'tri-color rotini pasta, pepperoni, salami, chicken, bleu cheese, mozzarella cheese, italian dressing',
      },
      {
        title: 'Pimiento Cheese',
        imageUrl: 'pimento.jpg',
      },
      {
        title: 'Fresh Salsa',
        imageUrl: 'salsa.jpg',
      },
      {
        title: 'Broccoli Salad',
        imageUrl: 'broccoli.jpg',
        ingredients: 'broccoli, cauliflower, tomatoes, red onion, ranch dressing',
      },
      {
        title: 'Cole Slaw',
        imageUrl: 'slaw.jpg',
      },
      {
        title: 'Hot Slaw',
        imageUrl: 'hot-slaw.jpg',
      },
      {
        title: 'Bacon Ranch Potato Salad',
        imageUrl: 'potato-salad.jpg',
      },
      {
        title: 'Corn Salad',
        imageUrl: 'corn.jpg',
      },
      {
        title: 'Baked Beans',
        imageUrl: 'beans.jpg',
      },
      {
        title: 'Pulled Pork BBQ',
        imageUrl: 'bbq.jpg',
      },
      {
        title: 'Smoked Baby Back Ribs',
        imageUrl: 'ribs.jpg',
      },
      {
        title: 'Smoked Chicken Halves',
        imageUrl: 'chicken.jpg',
      },
      {
        title: 'Smoked Chicken Breast',
        imageUrl: 'chicken-breast.jpg',
      },
      {
        title: 'Original Twice Baked Potato',
        imageUrl: 'original-potato.jpg',
        ingredients: 'milk, butter, sour cream, cheddar cheese, chives',
      },
      {
        title: 'Bacon Twice Baked Potato',
        imageUrl: 'bacon-potato.jpg',
        ingredients: 'bacon, milk, butter, sour cream, cheddar cheese, chives',
      },
      {
        title: 'Garlic Twice Baked Potato',
        imageUrl: 'garlic-potato.jpg',
        ingredients: 'garlic, milk, butter, sour cream, cheddar cheese, chives',
      },
      {
        title: 'Chipotle Twice Baked Potato',
        imageUrl: 'chipotle-potato.jpg',
        ingredients: 'chipotle pepper, milk, butter, sour cream, cheddar cheese, chives',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('DeliItems', null, {});
  },
};
