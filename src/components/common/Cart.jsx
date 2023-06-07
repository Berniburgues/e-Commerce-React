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

  const total = cart.product?.reduce(
    (sum, product) => sum + product.quantity * Number(product.price),
    0,
  );

  useEffect(() => {
    if (isVisible) dispatch(loadCartProducts(token));
  }, [isVisible]);

  return (
    <section
      className={
        'fixed inset-0 top-20 bg-[rgba(0,0,0,0.45)] transition-transform duration-500 backdrop-blur-sm  ' +
        toogleTransform
      }
    >
      <aside className="absolute right-0 h-full bg-slate-50 w-2/5 lg:w-1/4 p-3border-t-gray-300 border-t border-l">
        <h2 className="text-center text-2xl font-bold mb-5">Cart</h2>
        <div className="mt-2 max-h-96 overflow-y-auto">
          {cart.loading ?? <p>Loading cart products...</p>}
          {cart.product.length > 0 && (
            <ul className="divide-y divide-gray-300">
              {cart.product.map((product) => (
                <li key={product.id} className="py-3">
                  <CartProduct product={product} />
                </li>
              ))}
            </ul>
          )}
        </div>

        <section className="mt-10">
          <div className="flex justify-between mb-3">
            <p className="text-lg">Total:</p>
            <p className="text-lg font-bold">${total}</p>
          </div>
          <button
            disabled={!cart.product?.length}
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed"
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
