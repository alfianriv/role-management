'use strict';

const TABLE_NAME = 'PermissionGroupsPermissions';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(TABLE_NAME, {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      permissionGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'PermissionGroups', key: 'id' },
      },
      permissionId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Permissions', key: 'id' },
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
