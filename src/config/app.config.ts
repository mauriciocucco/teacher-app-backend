import typeOrmConfig from './typeorm.config';

export default () => ({
  environment: process.env.NODE_ENV || 'development',
  database: {
    ...typeOrmConfig(),
  },
  cors: {
    origin: process.env.CORS_ORIGIN || 'http://localhost:4200',
    methods: process.env.CORS_METHODS || 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: process.env.CORS_CREDENTIALS || true,
  },
  jwt: {
    global: true,
    secret: process.env.SECRET_TOKEN,
    signOptions: { expiresIn: '2 days' },
  },
});
