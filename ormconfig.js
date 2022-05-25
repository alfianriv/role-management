module.exports = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'role-management',
    migrationTableName: 'migration_metas',
    migrations: ['./migrations/*{.ts,.js}'],
    cli: {
        migrationsDir: 'migrations'
    }
}