import { formatCurrency } from '../../utils/helpers';
import UpdateItemQuantity from '../../ui/UpdateItemQuantity';
import DeleteItem from './DeleteItem';
function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className='py-3 sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-bold'>
          {formatCurrency(totalPrice)}
        </p>
        <UpdateItemQuantity id={pizzaId} />
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
