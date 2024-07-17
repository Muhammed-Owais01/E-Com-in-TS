import Cart from "../models/cart";
import CartItem from "../models/cartItem";

class CartDAO {
    async getCart(userId: number): Promise<Cart | null> {
        const cart: Cart | null = await Cart.findOne({ where: { userId: userId }});
        return cart;
    }

    async countAll(items: CartItem[]): Promise<number> {
        return await items.length;
    }

    async create(userId: number): Promise<Cart | null> {
        const cart: Cart | null = await Cart.create({ userId: userId });
        return cart;
    }
}

const CartDAOObj = new CartDAO;

export default CartDAOObj;