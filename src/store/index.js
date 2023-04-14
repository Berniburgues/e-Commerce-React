import { configureStore } from '@reduxjs/toolkit';
import user from './slices/user.slice';
import cart from './slices/cart.slice';
import purchases from './slices/purchases.slice';

const store = configureStore({
  reducer: {
    user,
    cart,
    purchases,
  },
});

export default store;
