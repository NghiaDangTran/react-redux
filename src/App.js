import Navbar from "./components/Navbar";
import CartContainer from './components/CartContainer'
import Modal from "./components/Modal";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getCartItems, countAll } from './features/cart/cartSlice';

function App() {
  const dispatch = useDispatch()

  const { isLoading, cartItems } = useSelector(store => store.cart)
  const { isOpen } = useSelector((state) => state.modal);
  useEffect(() => {
    dispatch(countAll());
    console.log(cartItems)

  }, [cartItems]);
  useEffect(() => {
    dispatch(getCartItems());
  }, []);


  if (isLoading) {
    return (
      <div className='loading'>
        <h1>Loading...</h1>
      </div>
    );
  }

  return <main>
    {isOpen && <Modal />}
    <Navbar></Navbar>
    <CartContainer></CartContainer>
  </main>
}
export default App;
