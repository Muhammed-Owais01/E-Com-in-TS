import { Express } from 'express';
import UserRouter from '../routes/user';

const routes = (app: Express) => {
    app.use('/user', UserRouter)
}

export default routes;