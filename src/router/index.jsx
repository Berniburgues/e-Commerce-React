import { createBrowserRouter } from 'react-router-dom';
import Layout from '../components/common/Layout';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Purchases from '../pages/Purchases';
import ProductDetail from '../pages/ProductDetail';
import NotFound from '../pages/NotFound';
import ProtectedRoute from '../components/common/ProtectedRoute';
import { loaderHome } from './loaders/loaderHome';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: loaderHome,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/purchases',
        element: (
          <ProtectedRoute>
            <Purchases />
          </ProtectedRoute>
        ),
      },
      {
        path: '/products/:id',
        element: <ProductDetail />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
]);
