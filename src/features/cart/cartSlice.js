import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

import cartItems from '../../cartItems'
import { useDispatch } from 'react-redux';
const initialState = {
    cartItems: [],
    amount: 0,
    total: 0,
    isLoading: false,
};

const url = 'https://course-api.com/react-useReducer-cart-project';

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (name, thunkAPI) => {
        try {
            // console.log(name);
            // console.log(thunkAPI);
            // console.log(thunkAPI.getState());
            // thunkAPI.dispatch(openModal());
            const resp = await axios(url);
            return resp.data;
        } catch (error) {
            return thunkAPI.rejectWithValue('something went wrong');
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearCart: (state) => {

            state.cartItems = []
        },
        countAll: (state, action) => {

            let amout = 0
            let to = 0
            state.cartItems.forEach((i) => {
                amout += i.amount
                to += i.price * i.amount

            })
            state.amount = amout
            state.total = to



        }
        , doAllId: (state, { payload }) => {
            const { name, id } = payload
            if (name === "remove") {
                state.cartItems = state.cartItems.filter(at => {
                    return at.id !== id
                })
            }
            if (name === "add") {
                const cartItem = state.cartItems.find((item) => item.id === payload.id);
                console.log(cartItem)
                cartItem.amount = cartItem.amount + 1;

            }
            if (name === "decrease") {
                const cartItem = state.cartItems.find((item) => item.id === payload.id);
                console.log(cartItem)
                if (cartItem.amount === 1) {
                    state.cartItems = state.cartItems.filter((at, index) => {
                        return at !== cartItem
                    })
                }

                cartItem.amount = Math.max(cartItem.amount - 1, 1
                )



            }
        }
    },
    extraReducers: {
        [getCartItems.pending]: (state) => {
            state.isLoading = true
        },
        [getCartItems.fulfilled]: (state, action) => {
            state.isLoading = false
            state.cartItems = action.payload
            console.log(state.cartItems)
        },
        [getCartItems.rejected]: (state) => {
            state.isLoading = false
        },
    }
});


export const { clearCart, countAll, doAllId } = cartSlice.actions


export default cartSlice.reducer;