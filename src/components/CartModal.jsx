import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Cart from './Cart';

// Forward the ref to the modal component
const CartModal = forwardRef(function Modal(
    { title, actions },
    ref
) {
    const dialog = useRef();  // Create a ref for the modal
   
    useImperativeHandle(ref, () => {
        return {
            // Open the modal
            open: () => {
                dialog.current.showModal();
            },
            // Close the modal
            close: () => {
                dialog.current.close();
            }
        };
    });
    
    return createPortal(
        <dialog id="modal" ref={dialog}>
            <h2>{title}</h2>
            <Cart />
            <form method="dialog" id="modal-actions">
                {actions}
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default CartModal;