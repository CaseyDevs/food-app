import { useFormStatus } from 'react-dom';
import { useContext, useState } from 'react';
import { CartContext } from '../store/cart-context';
import { checkoutValidation } from '../utlils/checkoutValidation';
import CheckoutModal from './CheckoutModal';

export default function Checkout() {
    const { pending } = useFormStatus();
    const { items, clearCart, checkoutCompleted, setCheckoutCompleted } = useContext(CartContext);
    const [formState, setFormState] = useState({
        errors: null,
        enteredValues: {
            order: {
                customer: {
                    name: '',
                    email: '',
                    street: '',
                    city: '',
                    'postal-code': ''
                }
            }
        }
    });

    const totalPrice = items.reduce((acc, item) => acc + (+item.price) * item.quantity, 0);
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    async function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        // Create order data object from form data
        const orderData = {
            order: {
                customer: {
                    name: formData.get('name'),
                    email: formData.get('email'),
                    street: formData.get('address'),
                    'postal-code': formData.get('zip'),
                    city: formData.get('city')
                },
                items: items,
                totalPrice: totalPrice
            }
        };

        // Validate order data
        const errors = checkoutValidation(orderData);
        if (errors.length > 0) {
            setFormState({ errors, enteredValues: orderData });
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to submit order');
            }

            setCheckoutCompleted(true);
            setFormState({
                errors: null,
                enteredValues: {
                    order: {
                        customer: {
                            name: '',
                            email: '',
                            street: '',
                            city: '',
                            'postal-code': ''
                        }
                    }
                }
            });
        } catch (error) {
            setFormState({ 
                errors: [error.message], 
                enteredValues: orderData 
            });
        }
    }

    // Get default values safely
    const defaultValues = formState?.enteredValues?.order?.customer || {
        name: '',
        email: '',
        street: '',
        city: '',
        'postal-code': ''
    };

    // Render success view if checkout is completed
    if (checkoutCompleted) {
        return (
            <>
                <div className="checkout-success">
                    <h2>Thank you for your order!</h2>
                    <p>We received your order and will process it shortly.</p>
                    <p>We'll email you when your order has been shipped.</p>
                </div>
                <div>
                    <h3><strong>Order Details:</strong></h3>
                    <p><strong>Order Number:</strong> 1234567890</p>
                    <p><strong>Order Date:</strong> {new Date().toLocaleDateString()}</p>
                    <p><strong>Items:</strong></p>
                    <ol>
                        {items.map((item) => (
                            <li key={item.id}><strong>{item.name}</strong> x {item.quantity}</li>
                        ))}
                    </ol>
                    <p><strong>Order Total:</strong>{formattedTotalPrice}</p>
                </div>
            </>
        );
    }

    return (
        <div className="checkout">
            <form onSubmit={handleSubmit} noValidate>
                <div className="control">
                    <label htmlFor="name">Name</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name"
                        defaultValue={defaultValues.name} 
                    />
                </div>
                <div className="control">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email"
                        defaultValue={defaultValues.email} 
                    />
                </div>
                <div className="control">
                    <label htmlFor="address">Address</label>
                    <input 
                        type="text" 
                        id="address" 
                        name="address"
                        defaultValue={defaultValues.street} 
                    />
                </div>
                <div className="control-row">
                    <div className="control">
                        <label htmlFor="city">City</label>
                        <input 
                            type="text" 
                            id="city" 
                            name="city"
                            defaultValue={defaultValues.city} 
                        />
                    </div>
                    <div className="control">
                        <label htmlFor="zip">Postal Code</label>
                        <input 
                            type="text" 
                            id="zip" 
                            name="zip"
                            defaultValue={defaultValues['postal-code']} 
                        />
                    </div>
                </div>
                <div className="control-row">
                    <div className="control">
                        <button type="submit" disabled={pending} className="button">
                            {pending ? 'Submitting...' : 'Confirm'}
                        </button>
                    </div>
                </div>
                <div className="cart-total">
                    <p>Total Price:</p>
                    <p className="cart-total-price">{formattedTotalPrice}</p>
                </div>
                
                {/* Display errors */}
                {formState.errors && (
                    <ul className="errors">
                        {formState.errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                )}
            </form>
        </div>
    )
}