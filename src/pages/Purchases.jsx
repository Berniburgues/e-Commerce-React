import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getPurchases } from '../services/getPurchases';

const Purchases = () => {
  const token = useSelector((state) => state.user.token);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const loadPurchases = async () => {
      const purchases = await getPurchases(token);
      setPurchases(purchases);
    };
    loadPurchases();
  }, []);

  return (
    <section>
      <h2>Purchases</h2>
      <ul>
        {purchases?.map((purchase) => (
          <li key={purchase.id}>
            <div className="flex justify-between items-center border-b-2 pb-2">
              <div>
                <img
                  src={purchase.product.productImgs[0].url}
                  alt={purchase.product.title}
                  className=" w-24 h-24 object-contain rounded"
                />
              </div>
              <div className="ml-4 text-center">
                <h3 className="text-lg">{purchase.product.title}</h3>
                <p className="text-gray-500">{purchase.product.brand}</p>
              </div>
              <div className="flex-shrink-0">
                <p className="text-lg font-medium">${purchase.product.price}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Purchases;
