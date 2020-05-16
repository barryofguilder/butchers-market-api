export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('PackageBundles', [
      {
        displayOrder: 1,
        title: "Mix N' Match",
        flyerDownloadLink: 'docs/bundles-mixnmatch.pdf',
        prices: `
          Pick 5 for $53|
          Pick 10 for $99|
          Pick 20 for $195
        `,
        items: `
          2 (7 oz.) Beef Ribeye Steaks|
          2 (7 oz.) Beef N.Y. Strip Steaks|
          2 lbs. Beef Chuck Roast|
          2 lbs. Beef Chuck Tender Roast|
          2 lbs. Beef Sirloin Tip Roast|
          2 lbs. Beef Cube Steaks|
          2 lbs. Beef Stew|
          2 ½ lbs. Beef Ground Chuck|
          2 ¼ lbs. Beef Ground Round|
          2 ½ lbs. Boneless Pork Chops|
          5 lbs. Boston Butt Pork Roast|
          4 lbs. Country Style Pork Ribs|
          2 ½ lbs. Baby Back Pork Ribs|
          3 lbs. Fresh Made Pork Sausage|
          3 lbs. Smoked Pork Sausages|
          3 lbs. Bratwurst Sausages|
          3 lbs. Italian Sausages|
          2 ½ lbs. Sliced Slab Bacon|
          2 ½ lbs. Boneless Chicken Breast|
          2 ½ lbs. Boneless Chicken Tenders|
          4 ½ lbs. Split Chicken Breast|
          5 lbs. Chicken Wings|
          2 lbs. Tilapia Fish Fillets|
          2 lbs. Swai Fish Fillets|
          2 lbs. Catfish Fillets|
          2 lbs. Perch Fish Fillets|
          2 lbs. Cod Fish Fillets|
          1 lb. Cooked Peeled Shrimp
        `,
      },
      {
        displayOrder: 2,
        title: "Ice Box Mix N' Match",
        flyerDownloadLink: 'docs/iceboxflyer.pdf',
        prices: `
          Pick 5 for $19.99|
          Pick 10 for $37.99|
          Pick 20 for $75.99
        `,
        items: `
          Spicy Chicken Tenders|
          Popcorn Chicken|
          Breaded Chicken Tenders|
          Breaded Chicken Nuggets|
          Breaded Chicken Wings|
          Meatballs|
          Corndogs|
          Mini Corndogs|
          Sausage Biscuits|
          Sausage Croissants|
          Sausage| Egg| Cheese Biscuits|
          Chicken Biscuits|
          Canadian Bacon| Egg Muffins|
          Cheeseburger Sliders|
          Chicken Sliders|
          Chicken Tamales|
          Pizza Bites|
          Pizza Sticks|
          Cooked Sausage Patties|
          Pancake/Sausage on a Stick|
          Hash Brown Patties|
          Cheese Sticks|
          Jalapeno Cheese Poppers|
          Crinkle Cut Fries|
          Tater Tots|
          Seasoned Potato Wedges|
          Seasoned Potato Fries|
          Steak Cut Fries|
          Shoestring Fries|
          Mixed Vegetables|
          California Blend Mix Vegetables|
          Cut Green Beans|
          Breaded Okra|
          Sliced Yellow Squash|
          Corn on the Cob|
          Shoepeg Cut Corn|
          Corn Nuggets|
          Onion Rings|
          Hush Puppies|
          Yeast Rolls|
          Garlic Cheese Breadstick|
          Garlic Texas Toast|
          Southern Style Biscuits|
          Belgian Waffles|
          Cinnamon Rolls|
          Chocolate Chip Cookies|
          Sugar Cookies
        `,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('PackageBundles', null, {});
  },
};
