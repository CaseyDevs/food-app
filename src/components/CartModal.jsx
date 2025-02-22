export default function CartModal() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <h2>Cart</h2>
            <ul>
                {/* TODO: Show cart items */}
            </ul>
            <button>Close</button>
            <button>Checkout</button>
        </div>
    );
}