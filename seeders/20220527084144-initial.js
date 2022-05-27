'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', [
      {
        id: 1,
        name: 'superadmin',
      },
    ]);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'administrator',
        email: 'admin@gmail.com',
        roleId: 1,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
