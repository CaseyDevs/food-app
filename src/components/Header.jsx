import { useContext, useState, useRef } from 'react';
import { CartContext } from '../store/cart-context';
import CartModal from './CartModal';
import CheckoutModal from './CheckoutModal';

export default function Header() {
    const { items, setCheckoutCompleted, clearCart } = useContext(CartContext);
    const cartModal = useRef();
    const checkoutModal = useRef();

    // Open the cart modal
    function handleOpenCart() {
        cartModal.current.open();
    }
    
    // Close the cart modal
    function handleCloseCart() {
        cartModal.current.close();
    }

    // Open the checkout modal
    function handleOpenCheckout() {
        checkoutModal.current.open();
    }

    // Close the checkout modal
    function handleCloseCheckout() {
        checkoutModal.current.close();
        setCheckoutCompleted(false);
        clearCart();
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
                ref={cartModal}
                title="Cart" 
                actions={
                    <>
                        <button className="text-button" onClick={handleCloseCart}>Close</button>
                        <button className="button" disabled={items.length === 0} onClick={handleOpenCheckout}>Checkout</button>
                    </>
                }
            />
            {/* Checkout Modal */}
            <CheckoutModal 
                ref={checkoutModal}
                title="Checkout" 
                actions={
                    <>
                        <button className="text-button" onClick={handleCloseCheckout}>Close</button>
                    </>
                }
            />
        </>
    )
}