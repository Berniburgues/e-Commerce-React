import React from 'react';
import { useDispatch } from 'react-redux';
import { reset } from '../store/slices/user.slice';

const Home = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <h1>Home</h1>
      <button onClick={() => dispatch(reset())}>Log Out</button>
    </div>
  );
};

export default Home;
