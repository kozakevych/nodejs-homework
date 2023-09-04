import { Sequelize } from 'sequelize-typescript';

const sequelize = new Sequelize('your_database_name', 'your_database_user', 'your_database_password', {
  dialect: 'postgres',
  host: 'localhost',
  port: 5432
});

export default sequelize;
