export default function Product({name, price, description, image}) {
    function handleAddToCart() {
        console.log('Adding to cart');
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