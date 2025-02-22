export default function Product({name, price, description, image}) {
    function handleAddToCart() {
        console.log('Adding to cart');
    }

    return (
        <li className="meal-item">
            <img src={`./backend/public/${image}`} alt="Menu item" />
            <h3>{name}</h3>
            <p>{price}</p>
            <p>{description}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </li>
    )
}