import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loadPurchases } from '../store/slices/purchases.slice';

const Purchases = () => {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.user.token);
  const purchases = useSelector((state) => state.purchases.purchases);
  const loading = useSelector((state) => state.purchases.loading);

  useEffect(() => {
    dispatch(loadPurchases(token));
  }, [dispatch, token]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>Purchases</h1>
          <ul>
            {purchases.map((purchase) => (
              <li key={purchase.id}>
                {purchase.products.map((product) => (
                  <div key={product.id}>
                    <p>{product.title}</p>
                    <p>${product.price}</p>
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Purchases;
