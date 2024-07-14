import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./user";

class Item extends Model<InferAttributes<Item>, InferCreationAttributes<Item>> {
    declare id: CreationOptional<number>;
    declare itemname: string;
    declare price: number;
    declare description: string;
    declare itemImage: string;
    declare userId: ForeignKey<User['id']>;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

Item.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        itemname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(1024),
            allowNull: false
        },
        itemImage: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: "no_image.png"
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            },
        }
    },
    {
        sequelize,
        tableName: "items"
    }
)

export default Item;