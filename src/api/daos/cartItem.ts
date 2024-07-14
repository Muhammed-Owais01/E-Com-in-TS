import { Op } from "sequelize";
import Item from "../models/item";
import CartItem from "../models/cartItem";

class CartItemDAO {
    async getItem(cartId: number, itemId: number): Promise<CartItem | null> {
        const item: CartItem | null = await CartItem.findOne(
            { where: {
                [Op.and]: [{ cartId: cartId }, { itemId: itemId }] 
            }
        });
        return item;
    }

    async getAll(cartId: number): Promise<CartItem[]> {
        const items: CartItem[] = await CartItem.findAll({ where: { cartId: cartId }, 
            include: 'item'
        });
        return items;
    }

    async addItem(cartId: number, itemId: number, quantity: number, ) {
        
    }
}