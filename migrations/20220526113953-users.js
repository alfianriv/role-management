'use strict';

const TABLE_NAME = 'Users';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'Roles', key: 'id' }
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
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(TABLE_NAME);
  },
};
