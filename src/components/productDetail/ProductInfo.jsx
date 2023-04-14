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

  return (
    <section>
      <div>
        {product.images.map((img) => (
          <img className="w-40 " src={img.url} alt="" key={img.id} />
        ))}
      </div>
      <div>
        <section>
          <p>{product.brand}</p>
          <h1 className="text-2xl text-black font-semibold">{product?.title}</h1>
          <p>{product.description}</p>
        </section>

        <section className="flex flex-row gap-32">
          <div>
            <h2 className="font-semibold text-gray-400">Price</h2>
            <p>${product.price}</p>
          </div>
          <div>
            <h2>Quantity</h2>
            <div>
              <button onClick={lessOne}>-</button>
              <span>{counter}</span>
              <button onClick={() => setCounter(counter + 1)}>+</button>
            </div>
          </div>
        </section>
        <button disabled={cart.loading} onClick={handleAddCart}>
          Add to cart <i className="bx bx-cart-add"></i>
        </button>
      </div>
    </section>
  );
};

export default ProductInfo;
