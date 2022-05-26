'use strict';

const TABLE_NAME = 'Roles';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },

      createdAt: {
        type: Sequelize.TIMESTAMPZ,
      },
      updatedAt: {
        type: Sequelize.TIMESTAMPZ,
      },
      deletedAt: {
        type: Sequelize.TIMESTAMPZ,
        allowNull: true,
      },
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  }
};
