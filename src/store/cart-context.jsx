import { createContext, useState, useContext } from 'react';
import { ProductsContext } from './products-context';

export const CartContext = createContext({
    items: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    updateItemQuantity: () => {},
});

export function CartContextProvider({ children }) {
    const [items, setItems] = useState([]);
    const [checkoutCompleted, setCheckoutCompleted] = useState();   
    const productsContext = useContext(ProductsContext);

    // Add item to cart
    function handleAddItemToCart(id) {
        setItems((prevItems) => {
            const existingCartItemIndex = prevItems.findIndex((item) => item.id === id);

            if (existingCartItemIndex > -1) {
                const updatedItems = [...prevItems];
                updatedItems[existingCartItemIndex] = {
                    ...prevItems[existingCartItemIndex],
                    quantity: prevItems[existingCartItemIndex].quantity + 1,
                };
                return updatedItems;
            } else {
                const product = productsContext.products.find((product) => product.id === id);
                return [...prevItems, {
                    id: id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                }];
            }
        });
    }

    // Remove item from cart
    function handleRemoveItemFromCart(id) {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }

    // Update item quantity
    function handleUpdateItemQuantity(id, amount) {
        setItems((prevItems) => prevItems.map((item) => item.id === id ? { ...item, quantity: amount } : item));
    }

    function handleClearCart() {
        setItems([]);
    }

    // Pass the items and addItemToCart function using context
    const cartContextValue = {
        items: items,
        addItemToCart: handleAddItemToCart,
        removeItemFromCart: handleRemoveItemFromCart,
        updateItemQuantity: handleUpdateItemQuantity,
        checkoutCompleted: checkoutCompleted,
        setCheckoutCompleted: setCheckoutCompleted,
        clearCart: handleClearCart,
    };

    return <CartContext.Provider value={cartContextValue}>
        {children}
    </CartContext.Provider>
    
}