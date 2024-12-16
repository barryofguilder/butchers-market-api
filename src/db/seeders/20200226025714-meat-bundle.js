export default {
  async up(queryInterface) {
    return await queryInterface.bulkInsert('MeatBundles', [
      {
        displayOrder: 1,
        title: '20lb Meat Pack',
        price: '79',
        featured: true,
        isHidden: false,
        items: `
          5 lbs. Ground Chuck|
          2 ½ lbs. Bonesless Chicken Breasts|
          2 ½ lbs. Boneless Chicken Tenders|
          5 lbs. Boston Butt Pork Roast|
          5 lbs. Bonelesss Pork Chops
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayOrder: 2,
        title: '30lb Meat Pack',
        price: '99',
        featured: false,
        isHidden: false,
        orderEnabled: false,
        items: `
          5 lbs. Ground Chuck|
          5 lbs. Boneless Pork Chops|
          4 lbs. Country Style Pork Ribs|
          2 lbs. Sliced Smoked Bacon|
          2 lbs. Boneless Chicken Breasts|
          2 lbs. Boneless Chicken Tenders|
          10 lbs. Chicken Leg Quarters
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayOrder: 3,
        title: '40lb Meat Pack',
        price: '129',
        featured: false,
        isHidden: false,
        orderEnabled: false,
        items: `
          4 lbs. Chuck Roast|
          10 lbs. Ground Chuck|
          6 lbs. Boneless Pork Chops|
          5 lbs. Boston Butt Pork Roast|
          5 lbs. Bone-In Chicken Breasts|
          10 lbs. Chicken Leg Quarters
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayOrder: 4,
        title: '50lb Meat Pack',
        price: '179',
        featured: true,
        isHidden: false,
        orderEnabled: false,
        items: `
          10 lbs. Ground Chuck|
          10 lbs. Boneless Pork Chops|
          10 lbs. Country Style Pork Ribs|
          4 lbs. Boneless Chicken Tenders|
          6 lbs. Boneless Chicken Breasts|
          10 lbs. Chicken Leg Quarters
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayOrder: 5,
        title: '75lb Meat Pack',
        price: '368',
        featured: false,
        isHidden: false,
        orderEnabled: false,
        items: `
          4 (7 oz.) Ribeye Steaks|
          4 (7 oz.) N.Y. Strip Steaks|
          2 lbs. Chuck Roast|
          2 lbs. Beef Cubed Steak|
          2 lbs. Beef Stew Meat|
          10 lbs. Ground Chuck|
          10 lbs. Boneless Pork Chops|
          5 lbs. Boston Butt Pork Roast|
          4 lbs. Country Style Pork Ribs|
          4 lbs. Pork Sausage|
          2 lbs. Sliced Smoked Bacon|
          4 lbs. Boneless Chicken Breasts|
          6 lbs. Boneless Chicken Tenders|
          5 lbs. Bone-In Chicken Breasts|
          10 lbs. Chicken Leg Quarters|
          5 lbs. Chicken Wings
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayOrder: 6,
        title: '100lb Meat Pack',
        price: '395',
        featured: false,
        isHidden: false,
        orderEnabled: false,
        items: `
          10 lbs. Chuck Roast|
          20 lbs. Ground Chuck|
          10 lbs. Boneless Pork Chops|
          10 lbs. Country Style Pork Ribs|
          10 lbs. Boston Butt Pork Roast|
          10 lbs. Pork Sausage|
          10 lbs. Sliced Smoked Bacon|
          4 lbs. Boneless Chicken Breasts|
          6 lbs. Boneless Chicken Tenders|
          10 lbs. Chicken Leg Quarters
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayOrder: 7,
        title: '#1 Meat Pack',
        price: '89',
        featured: false,
        isHidden: false,
        orderEnabled: false,
        items: `
          4 (7oz) Ribeye Steaks|
          2 lbs. Beef Cube Steaks|
          5 lbs. Ground Chuck|
          2 ½ lbs. Boneless Pork Chops|
          2 lbs. Boneless Chicken Tenders
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayOrder: 8,
        title: '#2 Meat Pack',
        price: '89',
        featured: false,
        isHidden: false,
        orderEnabled: false,
        items: `
          4 (7oz) N.Y. Strip Steaks|
          2 lbs. Beef Stew Meat|
          5 lbs. Ground Chuck|
          2 lbs. Boneless Chicken Tenders|
          2 ½ lbs. Boneless Pork Chops
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        displayOrder: 9,
        title: 'Mega Bundle',
        price: '148',
        featured: true,
        isHidden: false,
        orderEnabled: false,
        items: `
          2 (7 oz.) Ribeye Steaks|
          2 (7 oz.) N.Y. Strip Steaks|
          2 lbs. Chuck Roast|
          2 lbs. Beef Cube Steaks|
          5 lbs. Ground Chuck|
          5 lbs. Boneless Pork Chops|
          3 lbs. Pork Sausage|
          2 lbs. Sliced Smoked Bacon|
          10 lbs. Bone-in Chicken Breast
        `,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    return await queryInterface.bulkDelete('MeatBundles', null, {});
  },
};
