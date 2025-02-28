import { useFormStatus } from 'react-dom';
import { useContext, useActionState, useEffect, useState } from 'react';
import { CartContext } from '../store/cart-context';
import { checkoutValidation } from '../utlils/checkoutValidation';

export default function Checkout() {
    const { pending } = useFormStatus();
    const { items } = useContext(CartContext);
    const [checkoutCompleted, setCheckoutCompleted] = useState(false);
    

    const totalPrice = items.reduce((acc, item) => acc + (+item.price) * item.quantity, 0);
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    async function checkoutAction(prevData, formData) {
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
            return { errors, enteredValues: orderData };
        }

        // Submit order data to backend
        try {
            const response = await fetch('http://localhost:3000/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(orderData)
            });

            if (!response.ok) {
                throw new Error('Failed to submit order');
            }

            return { errors: null, order: orderData, success: true };
        } catch (error) {
            // Handle error
            return { 
                errors: ['Failed to submit order. Please try again.'], 
                order: orderData 
            };
        }
    }

    // Initialise form state and action handler with initial values
    const [formState, formAction] = useActionState(checkoutAction, {
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

    // Get default values safely
    const defaultValues = formState?.enteredValues?.order?.customer || {
        name: '',
        email: '',
        street: '',
        city: '',
        'postal-code': ''
    };

    // TODO: Add checkout completed message
    function handleSubmit() {
        console.log('Checkout completed');
        setCheckoutCompleted(true);
        setTimeout(() => {
            setCheckoutCompleted(false);
        }, 3000);
    }

    return (
        <div className="checkout">
            <form action={formAction} noValidate>
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
                        <button onClick={handleSubmit} disabled={pending} className="button">
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