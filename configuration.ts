export default () => ({
  database: {
    postgreUser: process.env.POSTGRE_USER,
    postgrePassword: process.env.POSTGRE_PASSWORD,
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
  },
});
