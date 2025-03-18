import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { registerUser } from '@/store/auth';
import { RootState, AppDispatch } from '@/store/store';

export default function Register() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    user_name: '',
    email: '',
    password: '',
    re_password: '',
  });

  const { user_name, email, password, re_password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(registerUser({ user_name, email, password, re_password }));
    // Redirect to login page after successful registration
    if (!loading && !error) {
      window.location.href = '/login';
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-800 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Create an Account</h2>
        <form onSubmit={onSubmit}>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="user_name">
              Username
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-900 dark:text-gray-100 transition-all duration-300"
              type="text"
              id="user_name"
              name="user_name"
              value={user_name}
              onChange={onChange}
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-900 dark:text-gray-100 transition-all duration-300"
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-900 dark:text-gray-100 transition-all duration-300"
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder="Enter your password"
            />
          </div>
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2" htmlFor="re_password">
              Confirm Password
            </label>
            <input
              className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 text-gray-900 dark:text-gray-100 transition-all duration-300"
              type="password"
              id="re_password"
              name="re_password"
              value={re_password}
              onChange={onChange}
              placeholder="Confirm your password"
            />
          </div>
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 shadow-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-sm text-blue-500 dark:text-blue-400 hover:underline transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}