import { useContext, useState, useRef } from 'react';
import { CartContext } from '../store/cart-context';
import CartModal from './CartModal';

export default function Header() {
    const { items } = useContext(CartContext);
    const modal = useRef();

    // Open the cart modal
    function handleOpenCart() {
        modal.current.open();
    }

    return (
        <>
            <header id="main-header">
                <div id="title">
                    <img src="../src/assets/logo.jpg" alt="ReactMeals logo" />
                    <h1>ReactMeals</h1>
                </div>
                <button className="button" onClick={handleOpenCart}>Cart</button>
            </header>
            {/* Cart Modal */}
            <CartModal 
                ref={modal}
                title="Cart" 
                actions={
                    <>
                        <button className="text-button" onClick={() => modal.current.close()}>Close</button>
                        <button className="button" onClick={() => modal.current.close()}>Checkout</button>
                    </>
                }
            />
        </>
    )
}