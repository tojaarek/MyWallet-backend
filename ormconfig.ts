module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: process.env.POSTGRE_USER,
  password: process.env.POSTGRE_PASSWORD,
  database: 'mywallet',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: true, // False on prod
};
