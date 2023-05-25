const typeOrmConfig = () => ({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || '',
  username: process.env.DB_USER || '',
  password: process.env.DB_PASSWORD || '',
  entities: [__dirname + '/../**/entities/*.entity.{ts,js}'],
  /* Note : it is unsafe to use synchronize: true for schema synchronization
    on production once you get data in your database. */
  synchronize: process.env.DB_SYNCHRONIZE || false,
  autoLoadEntities: true,
  migrationsTableName: 'migration',
  // migrations: [
  //   process.env.NODE_ENV === 'production'
  //     ? 'dist/migrations/*.js'
  //     : __dirname + 'dist/migrations/*.js',
  // ], // normal approach
  migrations: [__dirname + '/../migrations/*.{ts,js}'], // with 'migrations/*' within exclude property in tsconfig.build.json
  migrationsRun: process.env.MIGRATIONS_RUN || false,
  cli: {
    migrationsDir: 'src/migrations',
  },
});

export default typeOrmConfig;
