import { useState, useEffect, useContext } from 'react';
import Product from './Product.jsx'
import { ProductsContext } from '../store/products-context.jsx'

export default function Products() {
    const productsContext = useContext(ProductsContext);

    // Show loading state while fetching products
    if (productsContext.isLoading) {
        return <p className="center">Loading Products...</p>
    }

    // Show products
    return (
        <ul id="meals">
            {productsContext.products && productsContext.products.map((product) => {
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
            {!productsContext.products && <p>No products found.</p>}
        </ul>
    )
}