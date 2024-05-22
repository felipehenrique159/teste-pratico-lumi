import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('postgres', 'admin', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
});

export default sequelize;
