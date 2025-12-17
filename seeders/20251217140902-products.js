"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {

    // 1️⃣ Fetch categories
    const categories = await queryInterface.sequelize.query(
      `SELECT id, name FROM "Categories";`
    );

    const categoryMap = {};
    categories[0].forEach(cat => {
      categoryMap[cat.name] = cat.id;
    });

    // 2️⃣ Products data
    const products = [
      {
        name: "iPhone 14",
        price: 69999,
        offer: 10,
        description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
        image: "assets/images/mobile/mob5.jpg",
        categoryId: categoryMap["Mobiles"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Samsung Galaxy",
        price: 59999,
        offer: 12,
        description: "Powerful A15 Bionic chipset with stunning Super Retina display.",
        image: "assets/images/mobile/mob3.jpg",
        categoryId: categoryMap["Mobiles"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "LG Smart TV",
        price: 35999,
        offer: 15,
        description: "Smart TV with stunning picture quality.",
        image: "assets/images/mobile/tv1.jpg",
        categoryId: categoryMap["TVs & Appliances"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Sony LED TV",
        price: 45999,
        offer: 10,
        description: "Sony Bravia LED TV",
        image: "assets/images/mobile/tv2.jpg",
        categoryId: categoryMap["TVs & Appliances"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dell Laptop",
        price: 79999,
        offer: 8,
        description: "High performance Dell laptop",
        image: "assets/images/mobile/el1.jpg",
        categoryId: categoryMap["Electronics"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "HP Laptop",
        price: 69999,
        offer: 10,
        description: "HP laptop for daily use",
        image: "assets/images/mobile/el2.jpg",
        categoryId: categoryMap["Electronics"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "KitchenAid Mixer",
        price: 24999,
        offer: 20,
        description: "Kitchen mixer grinder",
        image: "assets/images/mobile/home1.jpg",
        categoryId: categoryMap["Home & Kitchen"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Instant Pot",
        price: 9999,
        offer: 18,
        description: "Instant cooking pot",
        image: "assets/images/mobile/home2.jpg",
        categoryId: categoryMap["Home & Kitchen"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "L'Oreal Shampoo",
        price: 499,
        offer: 5,
        description: "Hair care shampoo",
        image: "assets/images/mobile/t1.jpg",
        categoryId: categoryMap["Beauty & Toys"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Dove Soap",
        price: 199,
        offer: 7,
        description: "Skin care soap",
        image: "assets/images/mobile/t2.jpg",
        categoryId: categoryMap["Beauty & Toys"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Wooden Dining Table",
        price: 45999,
        offer: 12,
        description: "Premium wooden dining table",
        image: "assets/images/mobile/f1.jpg",
        categoryId: categoryMap["Furniture"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Office Chair",
        price: 8999,
        offer: 15,
        description: "Ergonomic office chair",
        image: "assets/images/mobile/f2.jpg",
        categoryId: categoryMap["Furniture"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Organic Almonds",
        price: 1299,
        offer: 10,
        description: "Healthy dry fruits",
        image: "assets/images/mobile/g1.jpg",
        categoryId: categoryMap["Grocery"],
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Brown Rice",
        price: 599,
        offer: 8,
        description: "Healthy brown rice",
        image: "assets/images/mobile/g2.jpg",
        categoryId: categoryMap["Grocery"],
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // 3️⃣ Bulk insert
    await queryInterface.bulkInsert("products", products);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("products", null, {});
  }
};
