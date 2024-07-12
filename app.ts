import cors from 'cors';
import express, { Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import errorHandler from './api/middleware/errorHandler';
const app = express();

// const routes = require('./setup-routes');

app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());

// routes(app);

app.use(errorHandler)

export default app;