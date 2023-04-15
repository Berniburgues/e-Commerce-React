import React from 'react';
import LoginForm from '../components/login/LoginForm';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const Login = () => {
  const isUserLogged = useSelector((state) => state.user.isLogged);

  return (
    <section className="flex items-center h-screen">
      <div className="max-w-md mx-auto my-4 p-6 bg-white rounded-lg shadow-md  border-2 border-gray-300">
        <h2>Welcome! Enter your email and password to continue</h2>
        <div className="bg-blue-100 p-2 rounded-md my-2 border-2 border-blue-200">
          <h3 className="text-center font-bold mb-1">Test Data</h3>
          <p>bernardo.b@gmail.com</p>
          <p>bernardo1234</p>
        </div>
        <LoginForm />
        {isUserLogged && <Navigate to="/" replace />}
      </div>
    </section>
  );
};

export default Login;
