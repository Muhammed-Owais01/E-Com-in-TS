import http, { Server } from 'http';
import app from './app';
import sequelize from './api/config/db';
import setupAssociation from './api/models/associations/associations';

import dotenv from 'dotenv';
dotenv.config();

const port: string = process.env.PORT || '3000';

const server: Server = http.createServer(app);

(async() => {
    try {
        await sequelize.authenticate();
        setupAssociation();

        await sequelize.query('SET FOREIGN_KEY_CHECKS = 0;');
        await sequelize.sync({ alter: process.env.MODE === 'dev' })
        await sequelize.query('SET FOREIGN_KEY_CHECKS = 1;');

        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

console.log(`https:://localhost:${port}`);

server.listen(port);