import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem } from '../cart/cartSlice';
import UpdateItemQuantity from '../../ui/UpdateItemQuantity';
import DeleteItem from '../cart/DeleteItem';
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } =
    pizza;
  const dispatch = useDispatch();
  const { cart } = useSelector((state) => state.cart);
  const isAddedToCart =
    cart.findIndex((item) => item.pizzaId === id) !== -1;

  function handleAddToCart() {
    dispatch(
      addItem({
        pizzaId: id,
        name,
        unitPrice,
        quantity: 1,
        totalPrice: unitPrice * 1
      })
    );
  }
  return (
    <li className='flex gap-4 py-2'>
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className='flex flex-grow flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className=' text-sm capitalize italic text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ?
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          : <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          }

          {!soldOut &&
            (isAddedToCart ?
              <div className='flex gap-4'>
                <UpdateItemQuantity id={id} />
                <DeleteItem id={id} />
              </div>
            : <Button type='small' onHandleClick={handleAddToCart}>
                add to cart
              </Button>)}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
