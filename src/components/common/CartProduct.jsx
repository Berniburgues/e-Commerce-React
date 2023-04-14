import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteProductFromCart,
  updateQuantityProductCart,
} from '../../store/slices/cart.slice';

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.cart.loading);

  const handleDeleteProduct = () => {
    dispatch(deleteProductFromCart({ token, cartProductId: product.cartId }));
  };

  const updateHandleClick = () => {
    dispatch(
      updateQuantityProductCart({ token, cartProductId: product.cartId, quantity }),
    );
  };

  const lessOne = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  return (
    <article className="flex flex-col w-full items-center my-4 border-2 border-gray-300 p-2">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="w-1/3 mr-2">
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full h-auto"
          />
        </div>
        <div className="w-2/3 flex flex-col">
          <h3 className="text-base font-semibold truncate">{product.title}</h3>
          <div className="flex flex-row items-center my-2">
            <button
              className="w-6 h-6 text-xs flex items-center justify-center border border-gray-300 mr-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={lessOne}
            >
              -
            </button>
            <span className="w-8 h-8 text-center font-semibold border border-gray-300">
              {quantity}
            </span>
            <button
              className="w-6 h-6 text-xs flex items-center justify-center border border-gray-300 ml-1 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="my-2 w-full border-gray-300" />
      <div className="flex flex-row gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-xs"
          onClick={updateHandleClick}
          disabled={loading}
        >
          Update
        </button>
        <button
          className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded-md text-xs"
          onClick={handleDeleteProduct}
          disabled={loading}
        >
          Remove
        </button>
      </div>
      <p className="text-right text-xs">
        Total:{' '}
        <span className="font-semibold">${product.quantity * Number(product.price)}</span>
      </p>
    </article>
  );
};

export default CartProduct;
