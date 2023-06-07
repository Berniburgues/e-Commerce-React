import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addProductToCart } from '../../store/slices/cart.slice';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLogged, token } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);

  const isProductInCart = cart.product.some(
    (cartProduct) => cartProduct.id === product.id,
  );

  const handleAddProductBtn = (e) => {
    e.stopPropagation();
    if (isLogged)
      dispatch(addProductToCart({ token, quantity: 1, productId: product.id }));
    else navigate('/login');
  };

  return (
    <article
      key={product.id}
      className="cursor-pointer flex flex-col justify-between max-w-xs mx-2 my-4 rounded-lg overflow-hidden shadow-lg border-2 border-gray-300 w-64 md:w-72"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="h-52 w-full flex justify-center items-center">
        <img
          src={product.productImgs[0].url}
          alt={product.title}
          className="h-48 w-full object-contain mt-4"
        />
      </div>
      <hr className="border-gray-300 my-2" />
      <div className="p-2">
        <div className="text-center">
          <p className="font-semibold text-gray-500 uppercase mb-2">{product.brand}</p>
          <hr className="border-gray-300 my-2" />
        </div>
        <h2 className="font-semibold text-xl mb-3 text-center">{product.title}</h2>
        <hr className="border-gray-300 my-2" />
        <div className="flex justify-between items-center">
          <div className="flex flex-col">
            <h3 className="font-medium text-base text-gray-700">Price:</h3>
            <p className="font-semibold text-xl">${product.price}</p>
          </div>
          {!isProductInCart && (
            <button
              className="bg-blue-500 flex justify-center items-center p-2 rounded-full"
              onClick={handleAddProductBtn}
              disabled={cart.loading}
            >
              <i className="bx bxs-cart-add text-2xl text-white p-1" />
            </button>
          )}

          {isProductInCart && <p>The product is in the cart</p>}
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
