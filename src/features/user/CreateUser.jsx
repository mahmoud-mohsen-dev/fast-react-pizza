import { useState } from 'react';
import Button from '../../ui/Button';
import { useDispatch } from 'react-redux';
import { createUser } from './userSlice';

function CreateUser() {
  const [username, setUsername] = useState('');
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
  }

  function handleClick() {
    if (!username) return;
    dispatch(createUser(username));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className='mb-4 text-sm text-stone-600 md:text-base md:font-medium'>
        👋 Welcome! Please start by telling us your name:
      </p>

      <input
        type='text'
        placeholder='Your full name'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className='input mb-8 w-72'
      />

      {username !== '' && (
        <div>
          <Button
            to='/order/new'
            type='primary'
            onHandleClick={handleClick}
          >
            Start ordering
          </Button>
        </div>
      )}
    </form>
  );
}

export default CreateUser;
