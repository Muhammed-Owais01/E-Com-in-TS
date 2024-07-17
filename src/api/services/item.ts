import ItemDAO from "../daos/item";
import RequestError from "../exceptions/requestError";
import Item from "../models/item";
import parseQuery from "../utils/parseQuery";
import path from 'path';
import fs from 'fs';
import deleteFile from "../utils/deleteFile";
import { Express } from "express";

class ItemService {
    async getItemById(itemId: number): Promise<Item> {
        const item: Item | null = await ItemDAO.getById(itemId);
        
        if (!item) throw new RequestError("Item not found", 404);

        return item;
    }

    async getAllItems(oldLimit: string, page: string): Promise<{ count: number, items: Item[]}> {
        const { offset, limit }: {offset?: number | undefined, limit?: number | undefined} = parseQuery(oldLimit, page);

        const items: Item[] = await ItemDAO.getAll(limit, offset);

        if (!items) throw new RequestError("Could not find items", 404);

        return {
            count: await ItemDAO.countAll(items),
            items: items
        }
    }

    async getImageById(itemId: number): Promise<string> {
        const item: Item | null = await this.getItemById(itemId);

        const filePath: string = path.join(__dirname, '../../../uploads', item.itemImage as string);
        if (!fs.existsSync(filePath)) {
            throw new RequestError("File not found after upload", 500);
        }

        return filePath;
    }

    async create(itemname: string, price: number, description: string, userId: number, file?: Express.Multer.File): Promise<Item> {
        const item: Item | null = await ItemDAO.create(
            itemname,
            price,
            description,
            userId,
            file?.filename
        );

        if (!item) throw new RequestError("Could not create item", 404);

        return item;
    }

    async updateItem(id: number, 
        itemname: string | undefined, 
        price: number | undefined, 
        description: string | undefined,
        username: string, file?: Express.Multer.File): Promise<void> {
        const item: Item = await this.getItemById(id);

        if (item.creator?.username !== username) throw new RequestError("You cannot change this post", 403);

        if (file) 
            deleteFile(item.itemImage);

        await ItemDAO.update(id, itemname, price, description, file?.filename);
    }

    async deleteItem(itemId: number) {
        const item: Item = await this.getItemById(itemId);

        if (item.itemImage)
            deleteFile(item.itemImage);

        await ItemDAO.delete(itemId);
    }
}

const ItemServiceObj = new ItemService;

export default ItemServiceObj;