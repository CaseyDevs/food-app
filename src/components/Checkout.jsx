import { useState, useFormStatus } from 'react-dom';
import { useContext, useRef } from 'react';
import { CartContext } from '../store/cart-context';

export default function Checkout() {
    const formRef = useRef();
    const { pending } = useFormStatus();
    const { items } = useContext(CartContext);

    const totalPrice = items.reduce((acc, item) => acc + (+item.price) * item.quantity, 0);
    const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

    return (
        <div className="checkout">
            <form ref={formRef}>
                <div className="control">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" />
                </div>
                <div className="control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" />
                </div>
                <div className="control">
                    <label htmlFor="address">Address</label>
                    <input type="text" id="address" />
                </div>
                <div className="control-row">
                    <div className="control">
                        <label htmlFor="city">City</label>
                        <input type="text" id="city" />
                    </div>
                <div className="control">
                    <label htmlFor="zip">Postal Code</label>
                        <input type="text" id="zip" />
                    </div>
                </div>
                <div className="control">
                    <label htmlFor="country">Country</label>
                    <input type="text" id="country" />
                </div>
                <div className="control-row">
                    <div className="control">
                        <button disabled={pending} className="button">
                            {pending ? 'Submitting...' : 'Confirm'}
                        </button>
                    </div>
                </div>
                <div className="cart-total">
                    <p>Total Price:</p>
                    <p className="cart-total-price">{formattedTotalPrice}</p>
                </div>
                
            </form>
        </div>
    )
}