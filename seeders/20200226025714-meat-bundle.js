export default {
  async up(queryInterface, Sequelize) {
    return await queryInterface.bulkInsert('MeatBundles', [
      {
        displayOrder: 1,
        title: '20lb Meat Pack',
        price: '$79',
        featured: true,
        items: `
          5 lbs. Ground Chuck|
          2 ½ lbs. Bonesless Chicken Breasts|
          2 ½ lbs. Boneless Chicken Tenders|
          5 lbs. Boston Butt Pork Roast|
          5 lbs. Bonelesss Pork Chops
        `,
      },
      {
        displayOrder: 2,
        title: '30lb Meat Pack',
        price: '$89',
        featured: false,
        items: `
          5 lbs. Fresh Ground Chuck|
          3 ½ lbs. Boneless Pork Chops|
          4 lbs. Country Style Pork Ribs|
          2 ½ lbs. Market Style Bacon|
          2 ½ lbs. Boneless Chicken Breasts|
          2 ½ lbs. Boneless Chicken Tenders|
          10 lbs. Chicken Leg Quarters
        `,
      },
      {
        displayOrder: 3,
        title: '40lb Meat Pack',
        price: '$145',
        featured: false,
        items: `
          4 lbs. Beef Chuck Roast|
          10 lbs. Fresh Ground Chuck|
          5 lbs. Boneless Pork Chops|
          5 lbs. Boston Butt Pork Roast|
          6 lbs. Bone-In Chicken Breasts|
          10 lbs. Chicken Leg Quarters
        `,
      },
      {
        displayOrder: 4,
        title: '50lb Meat Pack',
        price: '$159',
        featured: true,
        items: `
          10 lbs. Fresh Ground Chuck|
          10 lbs. Boneless Pork Chops|
          10 lbs. Country Style Pork Ribs|
          5 lbs. Boneless Chicken Breasts|
          5 lbs. Boneless Chicken Tenders|
          10 lbs. Chicken Leg Quarters
        `,
      },
      {
        displayOrder: 5,
        title: '75lb Meat Pack',
        price: '$329',
        featured: false,
        items: `
          4 (7 oz.) Beef Ribeye Steaks|
          4 (7 oz.) Beef N.Y. Strip Steaks|
          2 lbs. Beef Chuck Roast|
          2 lbs. Beef Cubed Steak|
          2 lbs. Beef Stew Meat|
          10 lbs. Beef Ground Chuck|
          10 lbs. Boneless Pork Chops|
          5 lbs. Boston Butt Pork Roast|
          4 lbs. Country Style Pork Ribs|
          3 lbs. Pork Sausage|
          2 ½ lbs. Sliced Smoked Bacon|
          5 lbs. Boneless Chicken Breasts|
          5 lbs. Boneless Chicken Tenders|
          6 lbs. Bone-In Chicken Breasts|
          10 lbs. Chicken Leg Quarters|
          5 lbs. Chicken Wings
        `,
      },
      {
        displayOrder: 6,
        title: '100lb Meat Pack',
        price: '$369',
        featured: false,
        items: `
          10 lbs. Beef Chuck Roast|
          20 lbs. Fresh Ground Chuck|
          10 lbs. Boneless Pork Chops|
          10 lbs. Country Style Pork Ribs|
          10 lbs. Boston Butt Pork Roast|
          10 lbs. Pork Sausage|
          10 lbs. Sliced Smoked Bacon|
          5 lbs. Boneless Chicken Breasts|
          5 lbs. Boneless Chicken Tenders|
          10 lbs. Chicken Leg Quarters
        `,
      },
      {
        displayOrder: 7,
        title: 'Bundle Meat Pack #1',
        price: '$89',
        featured: false,
        items: `
          4 (7oz) Beef Ribeye Steaks|
          2 lbs. Beef Cube Steaks|
          5 lbs. Beef Ground Chuck|
          2 ½ lbs. Boneless Pork Chops|
          3 lbs. Split Chicken Breasts
        `,
      },
      {
        displayOrder: 8,
        title: 'Bundle Meat Pack #2',
        price: '$89',
        featured: false,
        items: `
          4 (7oz) Beef N.Y. Strip Steaks|
          2 lbs. Beef Stew|
          5 lbs. Beef Ground Chuck|
          2 ½ lbs. Boneless Chicken Tenders|
          2 ½ lbs. Boneless Pork Chops
        `,
      },
      {
        displayOrder: 9,
        title: 'Mega Bundle',
        price: '$145',
        featured: true,
        items: `
          2 (7 oz.) Ribeye Steaks|
          2 (7 oz.) N.Y. Strip Steaks|
          2 lbs. Beef Chuck Roast|
          2 lbs. Beef Cube Steak|
          5 lbs. Beef Ground Chuck|
          5 lbs. Boneless Pork Chops|
          3 lbs. Pork Sausage|
          2 ½ lbs. Sliced Slab Bacon|
          10 lbs. Bone-in Chicken Breast
        `,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return await queryInterface.bulkDelete('MeatBundles', null, {});
  },
};
