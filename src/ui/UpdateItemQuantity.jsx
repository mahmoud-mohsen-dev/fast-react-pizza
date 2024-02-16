import { useDispatch, useSelector } from 'react-redux';
import Button from './Button';
import {
  decreaseItemQuantity,
  increaseItemQuantity
} from '../features/cart/cartSlice';

function UpdateItemQuantity({ id }) {
  const { cart } = useSelector((state) => state.cart);
  const pizzaItem = cart.find((item) => item.pizzaId === id);
  const dispatch = useDispatch();

  const handleIncreament = () => {
    dispatch(increaseItemQuantity(id));
  };
  const handleDecreament = () => {
    dispatch(decreaseItemQuantity(id));
  };
  return (
    <div className='flex items-center gap-2 md:gap-3'>
      <Button onHandleClick={handleDecreament} type='round'>
        -
      </Button>
      <span className='text-sm font-medium'>
        {pizzaItem.quantity}
      </span>
      <Button onHandleClick={handleIncreament} type='round'>
        +
      </Button>
    </div>
  );
}

export default UpdateItemQuantity;
