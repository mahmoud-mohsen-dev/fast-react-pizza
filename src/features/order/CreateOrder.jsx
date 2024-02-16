import { useState } from 'react';

import {
  Form,
  redirect,
  useActionData,
  useNavigation
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import {
  clearCart,
  getCart,
  getTotalCartPrice
} from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store from '../../store';
import { formatCurrency } from '../../utils/helpers';

// uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const { userName } = useSelector((state) => state.user);
  const cart = useSelector(getCart);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const totatCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totatCartPrice * 0.2 : 0;
  const totalPrice = totatCartPrice + priorityPrice;
  console.log(totalPrice);
  console.log(totatCartPrice);
  console.log(formatCurrency(15.0));

  const divInputStyles =
    'mb-5 flex flex-col gap-2 sm:flex-row sm:items-center';

  if (!cart.length) return <EmptyCart />;
  return (
    <div className='px-4 py-6'>
      <h2 className=' mb-8 text-xl font-semibold'>
        Ready to order? Let&apos;s go!
      </h2>

      <Form method='POST'>
        <div className={divInputStyles}>
          <label htmlFor='customer' className='sm:basis-40'>
            First Name
          </label>
          <input
            type='text'
            name='customer'
            id='customer'
            className='input flex-grow'
            defaultValue={userName}
            required
          />
        </div>

        <div className={`${divInputStyles} `}>
          <label htmlFor='phone' className='sm:basis-40'>
            Phone number
          </label>
          <div className='grow'>
            <input
              type='tel'
              name='phone'
              id='phone'
              className='input w-full'
              required
            />
            {formErrors?.phone && (
              <p className='mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className={`${divInputStyles}`}>
          <label htmlFor='address' className='sm:basis-40'>
            Address
          </label>
          <div className='grow'>
            <input
              type='text'
              name='address'
              id='address'
              className='input  w-full'
              required
            />
          </div>
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            className='h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            type='checkbox'
            name='priority'
            id='priority'
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input
            type='hidden'
            name='cart'
            value={JSON.stringify(cart)}
          />
          <Button disabled={isSubmitting} type='primary'>
            {isSubmitting ?
              'Placing order...'
            : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const objData = Object.fromEntries(formData);
  const order = {
    ...objData,
    cart: JSON.parse(objData.cart),
    priority: objData.priority === 'on'
  };

  const errors = {};
  const isPhoneValid = isValidPhone(order.phone);
  if (!isPhoneValid)
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  console.log(order);

  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
