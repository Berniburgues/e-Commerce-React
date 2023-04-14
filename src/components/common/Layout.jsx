import React from 'react';
import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import Cart from './Cart';
import { useSelector } from 'react-redux';

const Layout = () => {
  const navigate = useNavigate();
  const [isCartVisible, setIsCarVisible] = useState(false);
  const isLogged = useSelector((state) => state.user.isLogged);

  const handleCartClick = () => {
    if (isLogged) setIsCarVisible(!isCartVisible);
    else navigate('/login');
  };

  return (
    <>
      <header className="sticky top-0 h-20 z-10 p-5 bg-slate-50 flex flex-row justify-between">
        <Link to="/">
          <h1>e-Commerce</h1>
        </Link>
        <nav>
          <ul className="flex flex-row gap-5">
            <li>
              <button>
                <Link to="/purchases">
                  <i className="bx bxs-purchase-tag" />
                  Purchases
                </Link>
              </button>
            </li>
            <li>
              <button onClick={handleCartClick}>
                <i className="bx bxs-cart-alt" />
                Cart
              </button>
            </li>
            <li></li>
          </ul>
        </nav>
      </header>
      <main className="relative">
        <Outlet />
      </main>
      <Cart isVisible={isCartVisible} />
      <footer>Footer</footer>
    </>
  );
};

export default Layout;
