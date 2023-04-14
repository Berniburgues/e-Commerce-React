import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getProductDetail } from '../services/getProductDetail';
import { getAllProducts } from '../services/getAllProducts';
import ProductCard from '../components/common/ProductCard';
import ProductInfo from '../components/productDetail/ProductInfo';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const productData = await getProductDetail(id);
      const categoryId = productData.categoryId;

      const relatedProductsData = await getAllProducts({
        categoryId,
      });

      const relatedProductsWithoutTargetProduct = relatedProductsData.filter(
        (product) => product.id !== productData.id,
      );

      setProduct(productData);
      setRelatedProducts(relatedProductsWithoutTargetProduct);
    };

    loadData();
  }, [id]);

  return (
    <>
      {!product ? <p>Loading product...</p> : <ProductInfo product={product} />}
      <aside>
        <hr className="w-full border-gray-300 my-5" />
        <h2 className="text-center font-semibold text-gray-400 text-lg">
          Discover similar items
        </h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
          {relatedProducts.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default ProductDetail;
