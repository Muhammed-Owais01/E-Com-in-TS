import CartDAO from "../daos/cart";
import CartItemDAO from "../daos/cartItem";
import ItemDAO from "../daos/item";
import RequestError from "../exceptions/requestError";
import Cart from "../models/cart";
import CartItem from "../models/cartItem";
import Item from "../models/item";

class CartService {
    async getAllCartItems(userId: number): Promise<{ count: number, items: CartItem[] }> {
        const cart: Cart | null = await CartDAO.getCart(userId);
        if (!cart) throw new RequestError("Cart does not exist", 404);

        const items: CartItem[] = await CartItemDAO.getAll(cart.id);
        if (!items) throw new RequestError("Could not find items", 404);

        const count: number = await CartDAO.countAll(items);

        return {
            count: count,
            items: items
        }
    }

    async addItemToCart(itemId: number, quantity: number, userId: number): Promise<CartItem> {
        const item: Item | null = await ItemDAO.getById(itemId);
        if (!item) throw new RequestError("Item does not exist", 404);

        const cart: Cart | null = await CartDAO.getCart(userId);
        if (!cart) throw new RequestError("Cart does not exist", 404);

        const addedItem: CartItem | null = await CartItemDAO.addItem(cart.id, itemId, quantity);
        if (!addedItem) throw new RequestError("Could not add item to cart", 404);

        return addedItem;
    }
    
    async updateQuantity(itemId: number, userId: number, quantity: number): Promise<void> {
        const cart: Cart | null = await CartDAO.getCart(userId);
        if (!cart) throw new RequestError("Cart does not exist", 404);

        const item = await CartItemDAO.getItem(cart.id, itemId);
        if (!item) throw new RequestError("Item does not exist", 404);

        await CartItemDAO.updateQuantity(quantity, itemId, cart.id);
    }

    async deleteFromCart(itemId: number, userId: number): Promise<void> {
        const cart: Cart | null = await CartDAO.getCart(userId);
        if (!cart) throw new RequestError("Cart does not exist", 404);

        const item = await CartItemDAO.getItem(cart.id, itemId);
        if (!item) throw new RequestError("Item does not exist", 404);

        await CartItemDAO.deleteItem(cart.id, itemId);
    }
}

const CartServiceObj = new CartService;

export default CartServiceObj;