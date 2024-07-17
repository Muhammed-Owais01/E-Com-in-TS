import { NextFunction, Request, Response } from "express";
import CartService from "../services/cart";
import CartItem from "../models/cartItem";
import { ReturnResponse } from "../types/global";

class CartController {
    async get_all_items(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const id = req.userData?.id;

        const { count, items }: { count: number, items: CartItem[] } = 
        await CartService.getAllCartItems(id);
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
}