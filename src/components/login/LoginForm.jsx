import React, { useState } from 'react';
import { loginService } from '../../services/loginService';
import { useDispatch } from 'react-redux';
import { logIn, updateToken, updateUserData } from '../../store/slices/user.slice';

const LoginForm = () => {
  const dispatch = useDispatch();
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const login = async () => {
    const loginData = await loginService(loginForm);
    const userData = {
      id: loginData.user.id,
      firstName: loginData.user.firstName,
      lastName: loginData.user.lastName,
      email: loginData.user.email,
    };

    const token = loginData.token;

    dispatch(updateUserData(userData));
    dispatch(updateToken(token));
    dispatch(logIn());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login();
  };

  return (
    <form onChange={handleChange} onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="emailId" className="block text-gray-700 font-bold mb-2">
          Email
        </label>
        <input
          type="email"
          id="emailId"
          placeholder="your.email@gmail.com"
          name="email"
          value={loginForm.email}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="passwordId" className="block text-gray-700 font-bold mb-2">
          Password
        </label>
        <input
          type="password"
          id="passwordId"
          name="password"
          value={loginForm.password}
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Log in
      </button>
    </form>
  );
};

export default LoginForm;
