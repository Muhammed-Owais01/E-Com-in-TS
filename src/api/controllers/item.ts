import { Express, NextFunction, Request, Response } from "express";
import ItemService from "../services/item";
import Item from "../models/item";
import { ReturnResponse } from "../types/global";
import RequestError from "../exceptions/requestError";

class ItemController {
    async get_item(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const id: number = parseInt(req.params.itemId);

        const item: Item = await ItemService.getItemById(id);

        return res.status(200).json({ item: item });
    }

    async get_all_items(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const { limit, page }: { limit: string, page: string } = req.body;

        const { count, items }: { count: number, items: Item[] } = await ItemService.getAllItems(limit, page);

        return res.status(200).json({
            count: count,
            items: items.map(item => {
                return {
                    id: item.id,
                    itemname: item.itemname,
                    price: item.price,
                    description: item.description,
                    itemImage: item.itemImage,
                    userId: item.userId
                }
            })
        })
    }

    async get_image(req: Request, res: Response, next: NextFunction): Promise<void> {
        const id: number = parseInt(req.params.itemId);

        const imagePath: string = await ItemService.getImageById(id);

        return res.status(200).sendFile(imagePath);
    }

    async create_item(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const { itemname, price, description }: 
        { itemname: string, price: number, description: string } = req.body;

        const userId: number | undefined = req?.userId;
        const file: Express.Multer.File | undefined = req?.file;

        if (!userId) throw new RequestError("UserID not present", 404);

        const item: Item = await ItemService.create(itemname, price, description, userId, file);

        return res.status(200).json({ message: "Item created", post_id: item.id });
    }

    async update_item(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const { itemname, price, description, itemImage }: 
        { itemname: string, price: number, description: string, itemImage?: string } = req.body;

        const id: number = parseInt(req.params.itemId);
        const username: string = req.userData?.username;
        const file: Express.Multer.File | undefined = req?.file;

        const updatedItem: void = await ItemService.updateItem(id, itemname, price, description, username, file);

        return res.status(200).json({ message: "Item updated" });
    }

    async delete_item(req: Request, res: Response, next: NextFunction): Promise<ReturnResponse> {
        const id: number = parseInt(req.params.itemId);

        const deletedItem = await ItemService.deleteItem(id);

        return res.status(200).json({ message: "Item deleted" });
    }
}

const ItemControllerObj = new ItemController;

export default ItemControllerObj;