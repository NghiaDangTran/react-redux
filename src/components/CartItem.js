import React from 'react';
import { ChevronDown, ChevronUp } from '../icons'
import { useDispatch } from 'react-redux'
import { doAllId, countAll } from '../features/cart/cartSlice'
function CartItem({ id, img, title, price, amount }) {
    const dispatch = useDispatch()
    return (
        <article className='cart-item'>
            <img src={img} alt={title} />
            <div>
                <h4>{title}</h4>
                <h4 className='item-price'>${price}</h4>
                {/* remove button */}
                <button className='remove-btn' onClick={() => {
                    dispatch(doAllId({ id, name: "remove" }))
                    dispatch(countAll())

                }}>remove</button>
            </div>
            <div>
                {/* increase amount */}
                <button className='amount-btn' onClick={() => {
                    dispatch(doAllId({ id, name: "add" }))
                    dispatch(countAll())


                }}>
                    <ChevronUp />
                </button>
                {/* amount */}
                <p className='amount' >{amount}</p>
                {/* decrease amount */}
                <button className='amount-btn' onClick={() => {
                    dispatch(doAllId({ id, name: "decrease" }))
                    dispatch(countAll())


                }}>
                    <ChevronDown />
                </button>
            </div>
        </article>
    );
}

export default CartItem;