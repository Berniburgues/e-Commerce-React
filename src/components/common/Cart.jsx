import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { buyCart, loadCartProducts } from '../../store/slices/cart.slice';
import CartProduct from './CartProduct';

const Cart = ({ isVisible }) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const cart = useSelector((state) => state.cart);
  const toogleTransform = isVisible ? 'translate-x-0' : 'translate-x-full';

  const total = cart.products.reduce(
    (sum, product) => sum + product.quantity * Number(product.price),
    0,
  );

  useEffect(() => {
    if (isVisible) dispatch(loadCartProducts(token));
  }, [isVisible]);

  return (
    <section
      className={
        'fixed inset-0 top-20 bg-[rgba(0,0,0,0.45)] transition-transform duration-500 backdrop-blur-sm ' +
        toogleTransform
      }
    >
      <aside className="absolute right-0 h-full bg-slate-50 w-2/5 lg:w-1/4 p-3">
        <h2 className="text-center mb-5">Cart</h2>
        <div className="mt-5">
          {cart.loading ?? <p>Loading cart products...</p>}
          {!cart.loading && !cart.products.length && <p>Your cart is empty</p>}
          {!cart.loading && cart.products.length && (
            <ul>
              {cart.products.map((product) => (
                <li key={product.id}>
                  <CartProduct product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <section>
          <p className="mt-3 flex-row justify-between">
            <span>Total:</span>${total}
          </p>
          <button
            disabled={!cart.products.length}
            onClick={() => dispatch(buyCart(token))}
          >
            Buy Products
          </button>
        </section>
      </aside>
    </section>
  );
};

export default Cart;
