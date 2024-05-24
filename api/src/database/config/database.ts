import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

(async () => {
  await sequelize.sync({ force: true });
  console.log('Database & tables created!');
})();

export default sequelize;
