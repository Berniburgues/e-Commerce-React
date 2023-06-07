import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../store/slices/user.slice';
import { useLoaderData, Form } from 'react-router-dom';
import ProductCard from '../components/common/ProductCard';
import { loadCartProducts } from '../store/slices/cart.slice';

const Home = () => {
  const dispatch = useDispatch();
  const { isLogged, token } = useSelector((state) => state.user);
  const { products, categories, category, title } = useLoaderData();
  const [categoryValue, setCategoryValue] = useState(category ?? null);
  const [nameValue, setNameValue] = useState(title ?? '');

  const handleNameValue = (e) => {
    setNameValue(e.target.value);
  };

  useEffect(() => {
    if (isLogged) dispatch(loadCartProducts(token));
  }, []);

  useEffect(() => {
    setCategoryValue(category);
  }, [category]);

  useEffect(() => {
    setNameValue(title);
  }, [title]);

  return (
    <main>
      <section className="bg-white rounded-lg shadow-lg p-6">
        <Form className="flex flex-col lg:flex-row justify-center lg:justify-between items-center">
          <div className="mb-4 lg:mb-0 w-full lg:w-2/5 xl:w-1/3">
            <input
              type="search"
              value={nameValue}
              onChange={handleNameValue}
              placeholder="Search for a product..."
              name="title"
              className="w-full border-2 border-gray-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <fieldset className="mb-4 lg:mb-0 w-full lg:w-2/5 xl:w-1/3">
            <legend className="text-center text-lg font-medium mb-2">Category</legend>
            <div className="flex justify-center lg:gap-4 items-center flex-col sm:flex-row p-2">
              {categories.map((category) => (
                <div key={category.id} className="m-3">
                  <label
                    htmlFor={category.id + category.name}
                    className={`p-2 md:p-2 text-md font-semibold md:text-base text-center rounded-full cursor-pointer overflow-hidden max-w-xs ${
                      categoryValue?.id === category.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-400'
                    }`}
                  >
                    {category.name === 'Smart TV' ? 'TV' : category.name}
                  </label>
                  <input
                    type="radio"
                    name="category"
                    value={category.id}
                    checked={categoryValue?.id === category.id}
                    id={category.id + category.name}
                    onChange={() => setCategoryValue(category)}
                    style={{ display: 'none' }}
                  />
                </div>
              ))}
            </div>
          </fieldset>
          <div className="flex justify-between items-center gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-md py-2 px-4 hover:bg-blue-700 transition duration-300 ease-in-out"
            >
              Filter
            </button>

            {isLogged && (
              <button
                onClick={() => dispatch(reset())}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out"
              >
                Log Out
              </button>
            )}
          </div>
        </Form>
      </section>
      <section>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
        {!products.length && <p>No product matches the search parameter "{nameValue}"</p>}
      </section>
    </main>
  );
};

export default Home;
