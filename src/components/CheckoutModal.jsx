import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import Checkout from './Checkout';


const CheckoutModal = forwardRef(function Modal(
    { title, actions },
    ref
) {
    const dialog = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            },
            close: () => {
                dialog.current.close();
            }
        };
    });

    return createPortal(
        <dialog className="modal" ref={dialog}>
            <h2>{title}</h2>
            <Checkout />
            <form method="dialog" className="modal-actions">
                {actions}
            </form>
        </dialog>,
        document.getElementById('modal')
    );
});

export default CheckoutModal;
