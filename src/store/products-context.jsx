import { createContext, useState, useEffect } from 'react';

export const ProductsContext = createContext({
    products: [],
    isLoading: false,
    error: null,
});

export const ProductsContextProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Load products from the backend
    useEffect(() => {
        setIsLoading(true); 
        async function loadProducts() {
            try {
                const response = await fetch('http://localhost:3000/meals');
                const products = await response.json();
                setProducts(products);
                setIsLoading(false);
            } catch (error) {
                // TODO: Show error message component ??
                console.log(error)
                setIsLoading(false);
            }
        }
        loadProducts();
    }, []);

    const contextValue = {
        products: products,
        isLoading: isLoading,
    };

    return (
        <ProductsContext.Provider value={contextValue}>
            {children}
        </ProductsContext.Provider>
    );
};
