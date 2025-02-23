import { useContext } from 'react';
import { CartContext } from '../store/cart-context';

export default function Cart() {
    const { items, updateItemQuantity, removeItemFromCart } = useContext(CartContext);

    // Calculate the total price of the items in the cart
    const totalPrice = items.reduce((acc, item) => acc + (+item.price) * item.quantity, 0);
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    return (
        <div className="cart">
            {items.length === 0 && <p>No items in cart!</p>}
            {items.length > 0 && (
                <ul>
                    {/* Map through the items in the cart and display them */}
                    {items.map((item) => {
                        const formattedPrice = `$${(+item.price).toFixed(2)}`;
                        console.log(formattedPrice);
                        return (
                            <li key={item.id}>
                                <div>
                                    <span>{item.name}</span>
                                    <span> ({formattedPrice})</span>
                                </div>
                                <div className="cart-item-actions">
                                    {/* Decrease the quantity of the item */}
                                    <button onClick={() => {
                                        if (item.quantity > 1) {
                                            updateItemQuantity(item.id, item.quantity - 1);
                                        } else{
                                            removeItemFromCart(item.id);
                                        }
                                    }}>
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    {/* Increase the quantity of the item */}
                                    <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>
                                        +
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}
            <p id="cart-total-price">
                Cart Total: <strong>{formattedTotalPrice}</strong>
            </p>
        </div>
    );
}