import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { updateQuantityCart } from '../../services/updateQuantityCart';
import { addProductToCart } from '../../store/slices/cart.slice';

const ProductInfo = ({ product }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged, token } = useSelector((state) => state.user);
  const cart = useSelector((state) => state.cart);
  const [counter, setCounter] = useState(1);
  const [selectedImg, setSelectedImg] = useState(product.images[0]);

  const cartProduct = cart.products.find((x) => x.id === product.id);

  const lessOne = () => {
    const newCounter = counter - 1;
    if (newCounter >= 1) setCounter(newCounter);
  };

  const handleAddCart = () => {
    if (!isLogged) navigate('/login');
    else if (cartProduct) {
      dispatch(
        updateQuantityCart({
          token,
          cartProductId: cartProduct.cartId,
          quantity: cartProduct.quantity + counter,
        }),
      );
      setCounter(1);
    } else {
      dispatch(addProductToCart({ token, productId: product.id, quantity: counter }));
      setCounter(1);
    }
  };

  const handleImgClick = (img) => {
    setSelectedImg(img);
  };

  return (
    <section className="flex flex-col md:flex-row gap-8 my-8">
      <div className="flex flex-col w-full md:w-1/2">
        <img
          className="w-full h-96 object-contain mb-4"
          src={selectedImg.url}
          alt="Product"
        />
        <div className="flex flex-row flex-wrap justify-center">
          {product.images.map((img) => (
            <img
              key={img.id}
              className={`w-24 h-24 mb-4 mx-2 cursor-pointer border border-gray-300 ${
                selectedImg.id === img.id && 'border-green-500'
              }`}
              src={img.url}
              alt=""
              onClick={() => handleImgClick(img)}
            />
          ))}
        </div>
      </div>

      <div className="flex flex-col justify-between w-full md:w-1/2">
        <section>
          <p className="text-gray-400 mb-2">{product.brand}</p>
          <h1 className="text-2xl text-black font-semibold mb-4">{product?.title}</h1>
          <p className="mb-4">{product.description}</p>
        </section>

        <section className="flex flex-row items-center justify-around">
          <div className="text-center">
            <h2 className="font-semibold text-gray-400 mb-2">Price</h2>
            <p className="text-lg">${product.price}</p>
          </div>

          <div className="text-center">
            <h2 className="font-semibold text-gray-400 mb-2">Quantity</h2>
            <div className="flex flex-row items-center">
              <button
                className="px-3 py-1 bg-gray-200 border border-gray-300 rounded-l-md"
                onClick={lessOne}
              >
                -
              </button>
              <span className="mx-2 text-lg font-semibold">{counter}</span>
              <button
                className="px-3 py-1 bg-gray-200 border border-gray-300 rounded-r-md"
                onClick={() => setCounter(counter + 1)}
              >
                +
              </button>
            </div>
          </div>
        </section>

        <button
          className="py-2 px-4 bg-green-500 hover:bg-green-600 text-white rounded-md"
          disabled={cart.loading}
          onClick={handleAddCart}
        >
          Add to cart <i className="bx bx-cart-add ml-2"></i>
        </button>
      </div>
    </section>
  );
};

export default ProductInfo;
