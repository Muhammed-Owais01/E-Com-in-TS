import { Express } from 'express';
import UserRouter from '../routes/user';
import ItemRouter from '../routes/item';
import CartRouter from '../routes/cart';

const routes = (app: Express) => {
    app.use('/user', UserRouter)
    .use('/item', ItemRouter)
    .use('/cart', CartRouter);
}

export default routes;