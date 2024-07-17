import Item from "../models/item";

class ItemDAO {
    async getById(itemId: number): Promise<Item | null> {
        const item: Item | null = await Item.findByPk(itemId, {
            attributes: {
                exclude: ['userId']
            },
            include: {
                association: 'creator',
                attributes: ['id', 'username']
            }
        });

        return item;
    }

    async getAll(limit: number | undefined, offset: number | undefined): Promise<Item[]> {
        const items: Item[] = await Item.findAll({ offset: offset, limit: limit });
        return items;
    }

    async countAll(items: Item[]): Promise<number> {
        const count = await items.length;
        return count;
    }

    async create(itemname: string, price: number, description: string, userId: number, itemImage?: string): Promise<Item | null> {
        const item: Item | null = await Item.create({
            itemname,
            price,
            description,
            itemImage,
            userId
        });
        return item;
    }

    async update(id: number, 
        itemname: string | undefined, 
        price: number | undefined, 
        description: string | undefined,
        itemImage: string | undefined): Promise<number> {

        const [count]: [number] = await Item.update({
            itemname,
            price,
            description,
            itemImage
        }, { where: { id: id } });
        return count;
    }

    async delete(id: number): Promise<number> {
        const count: number = await Item.destroy({ where: { id: id }});
        return count;
    }
}

const ItemDAOObj = new ItemDAO;

export default ItemDAOObj;