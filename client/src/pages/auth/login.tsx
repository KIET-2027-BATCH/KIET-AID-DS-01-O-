import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '@/store/auth';
import { RootState, AppDispatch } from '@/store/store';
import Cookies from 'js-cookie';

export default function Login() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { loading, error, token } = useSelector((state: RootState) => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(loginUser({ email, password }));
  };

  useEffect(() => {
    if (token) {
      Cookies.set('token', token);
      navigate('/home');
    }
  }, [token, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-black p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-200 dark:border-gray-800 transition-all duration-300">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 dark:text-gray-100">Welcome Back</h2>
        <form onSubmit={onSubmit}>
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
          <button
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 text-white py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity duration-300 shadow-lg"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
        <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-blue-500 dark:text-blue-400 hover:underline transition-all duration-300"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
