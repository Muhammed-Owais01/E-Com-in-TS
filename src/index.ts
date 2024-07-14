import http, { Server } from 'http';
import app from './app';
import sequelize from './api/config/db';


const port: string = process.env.PORT || '3000';

const server: Server = http.createServer(app);

(async() => {
    try {
        await sequelize.authenticate();

        await sequelize.sync({ alter: true });
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()

console.log(`https:://localhost:${port}`);

server.listen(port);