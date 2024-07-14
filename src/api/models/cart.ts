import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import sequelize from "../config/db";
import User from "./user";

class Cart extends Model<InferAttributes<Cart>, InferCreationAttributes<Cart>> {
    declare id: CreationOptional<number>;
    declare userId: ForeignKey<User['id']>;
    declare createdAt?: Date;
    declare updatedAt?: Date;
}

Cart.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        }
    },
    {
        sequelize,
        tableName: "cart"
    }
)

export default Cart;