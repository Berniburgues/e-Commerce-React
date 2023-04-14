import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProductFromCart } from '../../store/slices/cart.slice';
import { updateQuantityCart } from '../../services/updateQuantityCart';

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);
  const token = useSelector((state) => state.user.token);
  const loading = useSelector((state) => state.cart.loading);

  const handleDeleteProduct = () => {
    dispatch(deleteProductFromCart({ token, cartProductId: product.cartId }));
  };

  const updateHandleClick = () => {
    dispatch(updateQuantityCart({ token, cartProductId: product.cartId, quantity }));
  };

  const lessOne = () => {
    const newQuantity = quantity - 1;
    if (newQuantity >= 1) setQuantity(newQuantity);
  };

  return (
    <article className="flex flex-col w-full items-center my-4 border-2 border-gray-300 p-4">
      <div className="flex flex-row w-full items-center justify-between">
        <div className="w-1/3 mr-4">
          <img
            src={product.images[0].url}
            alt={product.title}
            className="w-full h-auto"
          />
        </div>
        <div className="w-2/3 flex flex-col">
          <h3 className="text-lg font-semibold">{product.title}</h3>
          <div className="flex flex-row items-center my-2">
            <button
              className="w-6 h-6 text-sm flex items-center justify-center border border-gray-300 mr-2"
              onClick={lessOne}
            >
              -
            </button>
            <span className="w-8 h-8 text-center font-semibold border border-gray-300">
              {quantity}
            </span>
            <button
              className="w-6 h-6 text-sm flex items-center justify-center border border-gray-300 ml-2"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </button>
          </div>
        </div>
      </div>
      <hr className="my-4 w-full border-gray-300" />
      <div className="flex flex-row gap-5">
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md"
          onClick={updateHandleClick}
          disabled={loading}
        >
          <i className="bx bx-loader"></i>
        </button>
        <button
          className="mt-4 bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-md"
          onClick={handleDeleteProduct}
          disabled={loading}
        >
          <i className="bx bxs-trash" />
        </button>
      </div>
      <p className="text-right">
        Total:${' '}
        <span className="font-semibold">${product.quantity * Number(product.price)}</span>
      </p>
    </article>
  );
};

export default CartProduct;
