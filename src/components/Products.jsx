import { useState, useEffect } from 'react';
import Product from './Product.jsx'

export default function Products() {
    const [products, setProducts] = useState([]);  
    const [isLoading, setIsLoading] = useState(false);

    // TODO: Present loading state

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
                console.log(error)
                setIsLoading(false);
            }
        }
        loadProducts();
    }, []);

    // Show loading state while fetching products
    if (isLoading) {
        return <p className="center">Loading Products...</p>
    }

    return (
        <ul id="meals">
            {products.map((product) => {
                return (
                    <Product 
                        key={product.id}
                        name={product.name}
                        price={product.price} 
                        description={product.description}
                        image={product.image}
                    />
                )
            })}
        </ul>
    )
}