import React, { useState, useEffect } from 'react';
import { getPurchases } from '../services/getPurchases';
import { useSelector } from 'react-redux';

const Purchases = () => {
  const token = useSelector((state) => state.user.token);
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      const data = await getPurchases({ token });
      setPurchases(data);
    };
    fetchPurchases();
  }, [token]);

  return (
    <div>
      <h1>Purchases</h1>
      {purchases.map((purchase) => (
        <ul key={purchase.id} purchase={purchase} />
      ))}
    </div>
  );
};

export default Purchases;
