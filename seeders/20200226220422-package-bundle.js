export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('PackageBundles', [
      {
        displayOrder: 1,
        title: "Mix N' Match",
        fileUrl: 'bundles-mixnmatch_20230109.pdf',
        prices: `
          Pick 5 for $68|
          Pick 10 for $135|
          Pick 20 for $259
        `,
        items: `
          2 - 10oz. Sirloin Steaks|
          2 lbs. Chuck Roast|
          2 lbs. Sirloin Tip Roast|
          2 lbs. Beef Cube Steaks|
          2 lbs. Beef Stew Meat|
          2 ½ lbs. Ground Chuck|
          2 ¼ lbs. Ground Round|
          2 ½ lbs. Boneless Pork Chops|
          5 lbs. Boston Butt Pork Roast|
          4 lbs. Country Style Pork Ribs|
          3 lbs. Fresh Made Pork Sausage|
          2 lbs. Fresh Made Beef Sausage|
          3 lb. Bratwurst|
          3 lb. Italian Sausages|
          3 lbs. Smoked Sausages|
          2 lbs. Sliced Smoked Bacon|
          2 lbs. Boneless Chicken Breast|
          2 lbs. Boneless Chicken Tenders|
          5 lbs. Bone-In Chicken Breast|
          2 ¼ lbs. Fresh Jumbo Wings|
          2 lbs. Tilapia Fish Fillets|
          2 lbs. Swai Fish Fillets|
          2 lbs. Catfish Fillets|
          3 lbs. Cooked Crawfish|
          1 lb. Cooked Peeled Shrimp|
          2 Lobster Tails
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayOrder: 2,
        title: "Ice Box Mix N' Match",
        fileUrl: 'iceboxflyer_20230125.pdf',
        prices: `
          Pick 5 for $23.99|
          Pick 10 for $45.99|
          Pick 20 for $89.99
        `,
        items: `
          Pizza Rolls|
          Mini Combo Pizzas|
          Mini Pepperoni Pizzas|
          Mini Cheese Pizzas|
          Breaded Chicken Tenders|
          Spicy Chicken Tenders|
          Breaded Chicken Nuggets|
          Breaded Popcorn Chicken|
          Corndogs|
          Mini Corndogs|
          Cooked Sausage Patties|
          Belgian Waffles|
          Sausage, Egg, Cheese Biscuit|
          Chicken Biscuit|
          Canadian Bacon Muffin|
          Cheeseburger Sliders|
          Chicken Sliders|
          Buffalo Chicken Sliders|
          Breaded Onion Rings|
          Shoestring Fries|
          Crinkle Cut Fries|
          Waffle Cut Fries|
          Seasoned Potato Wedges|
          Tater Tots|
          Hashbrowns|
          Shoepeg Corn|
          Corn on the Cob|
          Green Beans|
          Blackeye Peas|
          Crowder Peas|
          Butter Peas|
          Green Peas|
          Mixed Vegetables|
          California Mix Veggies|
          Sliced Yellow Squash|
          Breaded Okra|
          Hush Puppies|
          Southern Style Biscuits|
          Dinner Rolls|
          Garlic Bread Sticks|
          Garlic Texas Toast|
          Cinnamon Rolls|
          Chocolate Chip Cookies
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('PackageBundles', null, {});
  },
};
