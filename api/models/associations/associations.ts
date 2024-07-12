import Cart from "../cart";
import CartItem from "../cartItem";
import Item from "../item";
import User from "../user";


const setupAssociation = () => {
    Item.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'creator'
    });

    CartItem.belongsTo(Item, {
        foreignKey: 'itemId',
        onDelete: 'CASCADE',
        as: 'item'
    })

    Cart.hasMany(CartItem, {
        foreignKey: 'cartId',
        onDelete: 'CASCADE',
        as: 'items'
    })

    Cart.belongsTo(User, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'user'
    })
    
}

export default setupAssociation;