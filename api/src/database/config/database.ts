import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'admin', 'admin', {
  host: 'db_postgres',
  dialect: 'postgres',
  logging: false,
});

(async () => {
  await sequelize.sync();
  console.log('Database & tables syncronizadas!');
})();

export default sequelize;
