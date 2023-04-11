import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const handleAddProductBtn = (e) => {
    e.stopPropagation();
  };

  return (
    <article
      key={product.id}
      className="cursor-pointer flex flex-col justify-between max-w-xs mx-2 my-4 rounded-lg overflow-hidden shadow-lg"
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className="h-52 w-full">
        <img
          src={product.productImgs[0]}
          alt={product.title}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg mb-2">{product.title}</h2>
        <div className="flex justify-between items-center">
          <h3 className="font-medium text-base text-gray-600">Price:</h3>
          <p className="font-semibold text-xl">${product.price}</p>
        </div>
        <button
          className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-full mt-4"
          onClick={handleAddProductBtn}
        >
          Add to Cart
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
