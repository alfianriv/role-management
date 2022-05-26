'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('PermissionGroupsRoles', {
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
      roleId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'Roles', key: 'id' },
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
    await queryInterface.dropTable('PermissionGroupsRoles');
  },
};
