import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

const TABLE_NAME = 'PermissionGroupsPermissions';

export class permissionGroupsPermissions1653494628213
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: TABLE_NAME,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'permissionGroupId',
            type: 'int',
          },
          {
            name: 'permissionId',
            type: 'int',
          },
          {
            name: 'createdAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updatedAt',
            type: 'datetime',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'deletedAt',
            type: 'datetime',
            isNullable: true,
          },
        ],
      }),
    );

    Promise.all([
      queryRunner.createForeignKey(
        TABLE_NAME,
        new TableForeignKey({
          columnNames: ['permissionGroupId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'PermissionGroups',
        }),
      ),
      queryRunner.createForeignKey(
        TABLE_NAME,
        new TableForeignKey({
          columnNames: ['permissionId'],
          referencedColumnNames: ['id'],
          referencedTableName: 'Permissions',
        }),
      ),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(TABLE_NAME);
  }
}
