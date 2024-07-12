import { Dialect, Sequelize } from "sequelize";

const sequelize = new Sequelize(
    process.env.SEQUELIZE_DATABASE!, 
    process.env.SEQUELIZE_USERNAME!, 
    process.env.SEQUELIZE_PASSWORD!, 
    {
        host: process.env.SEQUELIZE_HOST,
        dialect: process.env.SEQUELIZE_DIALECT as Dialect,
        logging: false
    }
);

export default sequelize;