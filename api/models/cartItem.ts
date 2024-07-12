import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../../db";
import Cart from "./cart";
import Item from "./item";

class CartItem extends Model<InferAttributes<CartItem>, InferCreationAttributes<CartItem>> {
    declare id: CreationOptional<number>;
    declare quantity: number;
    declare cartId: ForeignKey<Cart['id']>;
    declare itemId: ForeignKey<Item['id']>;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

CartItem.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        cartId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Cart,
                key: 'id'
            }
        },
        itemId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Item,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        tableName: "cartItems"
    }
)

export default CartItem;