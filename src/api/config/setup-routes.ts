import { Express } from 'express';
import UserRouter from '../routes/user';
import ItemRouter from '../routes/item';

const routes = (app: Express) => {
    app.use('/user', UserRouter)
    .use('/item', ItemRouter)
}

export default routes;