import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import {
  decreaseItemQuantity,
  deleteItem,
  increaseItemQuantity
} from '../features/cart/cartSlice';

function IncreamentDecreament({ id }) {
  const { cart } = useSelector((state) => state.cart);
  const pizzaItem = cart.find((item) => item.pizzaId === id);
  const dispatch = useDispatch();

  const handleIncreament = () => {
    dispatch(increaseItemQuantity(id));
  };
  const handleDecreament = () => {
    if (pizzaItem.quantity === 1) {
      dispatch(deleteItem(id));
      return;
    }
    console.log(pizzaItem);
    dispatch(decreaseItemQuantity(id));
  };
  return (
    <div>
      <Button onHandleClick={handleDecreament} type='small'>
        -
      </Button>
      <span className='mx-2'>{pizzaItem.quantity}</span>
      <Button onHandleClick={handleIncreament} type='small'>
        +
      </Button>
    </div>
  );
}

export default IncreamentDecreament;
