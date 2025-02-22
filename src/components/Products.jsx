import { useState, useEffect } from 'react';
import Product from './Product.jsx'

export default function Products() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function loadProducts() {
            try {
                const response = await fetch('http://localhost:3000/meals');
                const products = await response.json();
                setProducts(products);
                console.log(products);
                
            } catch (error) {
                console.log(error)
            }
        }
        loadProducts();
    }, []);

    return (
        <ul>
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