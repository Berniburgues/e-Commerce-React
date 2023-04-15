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
      <header className="sticky top-0 h-20 z-10 p-5 bg-gray-900 flex flex-row justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-white">e-Commerce</h1>
        </Link>
        <nav>
          <ul className="flex flex-row gap-5">
            <li>
              <button className="text-white font-medium hover:text-gray-400">
                <Link to="/purchases">
                  <i className="bx bxs-purchase-tag mr-1" />
                  Purchases
                </Link>
              </button>
            </li>
            <li>
              <button
                className="relative text-white font-medium hover:text-gray-400"
                onClick={handleCartClick}
              >
                <i className="bx bxs-cart-alt mr-1" />
                Cart
              </button>
            </li>
            <li>
              <button className="text-white font-medium hover:text-gray-400">
                <Link to="/">
                  <i className="bx bx-home mr-1" />
                  Home
                </Link>
              </button>
            </li>
          </ul>
        </nav>
      </header>
      <main className="relative">
        <Outlet />
      </main>
      <Cart isVisible={isCartVisible} />
      <footer className="bg-gray-900 text-white py-10 px-5 flex flex-col items-center">
        <div className="flex flex-col sm:flex-row sm:justify-between w-full max-w-6xl">
          <div className="flex flex-col mb-5 sm:mb-0">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <p>Email: info@ecommerce.com</p>
            <p>Phone: 123-456-7890</p>
            <p>Address: 1234 Main Street, Anytown USA</p>
          </div>
          <div className="flex flex-col mb-5 sm:mb-0">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex flex-row items-center justify-start gap-4">
              <a href="#">
                <i className="bx bxl-facebook text-3xl"></i>
              </a>
              <a href="#">
                <i className="bx bxl-twitter text-3xl"></i>
              </a>
              <a href="#">
                <i className="bx bxl-instagram text-3xl"></i>
              </a>
            </div>
          </div>
        </div>
        <hr className="w-full border-gray-300 my-5" />
        <p className="text-sm text-center">
          &copy; 2023 e-Commerce. All Rights Reserved.
        </p>
      </footer>
    </>
  );
};

export default Layout;
