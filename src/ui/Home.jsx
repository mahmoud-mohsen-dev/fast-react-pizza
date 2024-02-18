import { useSelector } from 'react-redux';
import CreateUser from '../features/user/CreateUser';
import Button from './Button';
function Home() {
  const { userName } = useSelector((state) => state.user);
  return (
    <div className='my-48 px-4 text-center'>
      <h1 className='mb-8 text-xl font-semibold md:text-3xl'>
        The best pizza.
        <br />
        <span className='mt-2 block text-yellow-500'>
          Straight out of the oven, straight to you.
        </span>
      </h1>

      {userName === '' ?
        <CreateUser />
      : <Button to='/menu' type='primary'>
          continue ordering, {userName}
        </Button>
      }
    </div>
  );
}

export default Home;
