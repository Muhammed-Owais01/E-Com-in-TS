import { NextFunction, Request, Response } from "express";
import CartService from "../services/cart";
import CartItem from "../models/cartItem";
import { ReturnResponse } from "../types/global";
import RequestError from "../exceptions/requestError";
import exp from "constants";

class CartController {
    async get_all_items(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const userId: number | undefined = req?.userId;

        if (!userId) throw new RequestError("UserID not present", 404);

        const { count, items }: { count: number, items: CartItem[] } = 
        await CartService.getAllCartItems(userId);
        let total = 0;
        let totalQuantity = 0;

        return res.status(200).json({
            count: count,
            items: items.map(item => {
                total += item.quantity * item.item?.price!;
                totalQuantity += item.quantity;
                return {
                    id: item.item?.id,
                    itemname: item.item?.itemname,
                    price: item.item?.price,
                    description: item.item?.description,
                    itemImage: item.item?.itemImage,
                    quantity: item.quantity
                }
            }),
            total: total,
            totalQuantity: totalQuantity
        })
    }

    async add_to_cart(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const itemId: number = parseInt(req.params.itemId);
        const { quantity }: { quantity: number } = req.body;
        const userId: number | undefined = req?.userId;

        if (!userId) throw new RequestError("UserID not present", 404);

        const item: CartItem = await CartService.addItemToCart(itemId, quantity || 1, userId);

        return res.status(200).json({ message: "Added to cart", itemId: item.itemId });
    }

    async update_cart(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const itemId: number = parseInt(req.params.itemId);
        const { quantity }: { quantity: number } = req.body;
        const userId: number | undefined = req?.userId;

        if (!userId) throw new RequestError("UserID not present", 404);

        const updatedItem: void = await CartService.updateQuantity(itemId, userId, quantity);

        return res.status(200).json({ message: "Cart Updated" });
    }

    async delete_from_cart(req: Request, res: Response, next: NextFunction) {
        const itemId: number = parseInt(req.params.itemId);
        const userId: number | undefined = req?.userId;

        if (!userId) throw new RequestError("UserID not present", 404);

        const deletedItem: void = await CartService.deleteFromCart(itemId, userId);

        return res.status(200).json({ message: "Item successfully deleted from cart", itemId: itemId });
    }
}

const CartControllerObj = new CartController;

export default CartControllerObj;