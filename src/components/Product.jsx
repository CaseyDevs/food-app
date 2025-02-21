export default function Product({name, price, description, image}) {
    return (
        <li className="meal-item">
            <img src={image} alt="Menu item" />
            <h3>{name}</h3>
            <p>{price}</p>
            <p>{description}</p>
        </li>
    )
}