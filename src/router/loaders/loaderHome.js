import { getAllProducts } from '../../services/getAllProducts';
import { getCategories } from '../../services/getCategories';

export const loaderHome = async ({ request }) => {
  const categories = await getCategories();
  const url = new URL(request.url);
  const categoryId = url.searchParams.get('category');
  let products;

  if (categoryId) {
    products = await getAllProducts({ category: categoryId });
  } else {
    products = await getAllProducts();
  }

  return {
    products,
    categories,
    category: categories.find((x) => x.id.toString() === categoryId),
  };
};
