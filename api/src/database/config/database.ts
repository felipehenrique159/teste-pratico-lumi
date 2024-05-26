import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'admin', 'admin', {
  host: 'db_postgres',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
