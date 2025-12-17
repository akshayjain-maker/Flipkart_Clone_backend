'use strict';

module.exports = {
  async up (queryInterface) {
    await queryInterface.bulkInsert('Categories', [
      { name: 'Mobiles', slug: 'mobiles', createdAt: new Date(), updatedAt: new Date() },
      { name: 'TVs & Appliances', slug: 'tvs-appliances', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Electronics', slug: 'electronics', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Home & Kitchen', slug: 'home-kitchen', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Beauty & Toys', slug: 'beauty-toys', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Furniture', slug: 'furniture', createdAt: new Date(), updatedAt: new Date() },
      { name: 'Grocery', slug: 'grocery', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
