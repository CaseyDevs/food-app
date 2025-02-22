import { createContext } from 'react';
import { ProductsContext } from './products-context';

export const CartContext = createContext({
    items: [],
    addItem: (id) => {},
    removeItem: (id) => {},
    updateItemQuantity: (id, amount) => {},
});

export function CartContextProvider({ children }) {
    const [items, setItems] = useState([]);
    const productsContext = useContext(ProductsContext);

    // Add item to cart
    function handleAddItemToCart(id) {
        const existingCartItem = items.find((item) => item.id === id);

        if (existingCartItem) {
            const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
            };
            setItems((prevItems) => [...prevItems, updatedItem]);
        } else {
            const product = productsContext.products.find((product) => product.id === id);
            const newItem = {
                id: id,
                name: product.name,
                price: product.price,
                quantity: 1,
            };
            setItems((prevItems) => [...prevItems, newItem]);
        }
    }

    // Remove item from cart
    function handleRemoveItemFromCart(id) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    // Update item quantity
    function handleUpdateItemQuantity(id, amount) {
        setItems((prevItems) => prevItems.map((item) => item.id === id ? { ...item, quantity: amount } : item));
    }

    // Pass the items and addItemToCart function using context
    const cartContextValue = {
        items: items,
        addItemToCart: handleAddItemToCart,
        removeItemFromCart: handleRemoveItemFromCart,
        updateItemQuantity: handleUpdateItemQuantity,
    };

    return <CartContext.Provider value={cartContextValue}>
        {children}
    </CartContext.Provider>
    
}