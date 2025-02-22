import { useContext } from 'react';
import { CartContext } from '../store/cart-context.jsx';

export default function Product({id, name, price, description, image}) {
    const cartContext = useContext(CartContext);

    function handleAddToCart() {
        cartContext.addItemToCart(id);
        console.log(cartContext.items);
    }

    return (
        <li className="meal-item">
            <article>
                <img src={`./backend/public/${image}`} alt="Menu item" />
                <h3>{name}</h3>
                <p className="meal-item-price">{price}</p>
                <p className="meal-item-description">{description}</p>
                <button onClick={handleAddToCart} className="button">Add to Cart</button>
            </article>
        </li>
    )
}