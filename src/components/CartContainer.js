import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './CartItem'
import { clearCart, countAll } from '../features/cart/cartSlice'
import { useEffect } from 'react';
import { openModal } from '../features/modal/modalSlice';

function CartContainer(props) {
    const dispatch = useDispatch()


    const { amount, cartItems, total } = useSelector(selector => selector.cart)


    useEffect(() => {
        dispatch(countAll({
            payload: { id: 1 },
            type: "cart/countAll"
        }))
    }, [])
    if (amount < 1) {

        return <section className='cart'>

            <header>
                <h2> your bag</h2>
                <h4 className='empty-cart'>is currently empty</h4>
            </header>

        </section>
    }

    return (
        <section className='cart'>
            <header>
                <h2>your bag</h2>

            </header>
            <div>
                {cartItems.map(i => {

                    return <CartItem key={i.id} {...i}></CartItem>
                })}
                <footer>
                    <hr />
                    <div className='cart-total'>

                        <h4>
                            total <span>${total}</span>
                        </h4>
                    </div>
                    <button className='btn clear-btn' onClick={() => {
                        dispatch(openModal());
                       
                    }}>
                        clear cart
                    </button>
                </footer>
            </div>
        </section>
    );
}

export default CartContainer;