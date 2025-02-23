import { useRef, useState, useFormStatus } from 'react-dom';

export default function Checkout() {
    const formRef = useRef();
    const { pending } = useFormStatus();

    return (
        <div>
            <h2>Checkout</h2>
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
                        <button disabled={pending} className="button">{pending ? 'Submitting...' : 'Confirm'}</button>
                    </div>
                <div className="control">
                        <button disabled={pending} className="text-button">{pending ? 'Cancelling...' : 'Cancel'}</button>
                    </div>
                </div>
            </form>
        </div>
    )
}