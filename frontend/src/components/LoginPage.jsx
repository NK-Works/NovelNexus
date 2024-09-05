import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import Cookies from 'js-cookie'
import coverImg2 from '../assets/login_signup_cover2.jpg';
import googleIcon from '../assets/google_icon.jpg';

const LoginPage = () => {
  const navigate = useNavigate(); // For navigation after login

  // State for form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(''); // Error message state

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const API_URL = import.meta.env.VITE_API_URL;
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      
      // Setting up cookies to store the token
      if (rememberMe) {
        const token = response.data.token;
        Cookies.set('token', token, { expires: 1 });
      } else {
        // Session token
        const token = response.data.token;
        Cookies.set('token', token);
      }

      // Redirect to dashboard or home page
      navigate('/home');

    } catch (err) {
      console.error('Login failed:', err);
      if (err.response && err.response.data && err.response.data.msg) {
        setError(err.response.data.msg);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col md:flex-row pt-0">
      {/* Cover Image Section */}
      <div className='relative w-full md:w-3/5 h-1/2 md:h-full'>
        <img src={coverImg2} className="w-full h-full object-cover" alt="Cover" />
        <div className='absolute top-[40%] left-1/4 flex flex-col text-white bg-black/20 p-4 rounded-lg max-w-xs md:max-w-lg'>
          <h1 className='text-2xl md:text-3xl font-bold mb-2'>Turn Your Ideas into Reality...</h1>
          <p className='text-base md:text-2xl font-normal'>Start your reading journey today and get together with an evergrowing community.</p>
        </div>
      </div>

      {/* Login Section */}
      <div className='w-full md:w-2/5 h-auto md:h-full bg-[#f5f5f5] flex flex-col p-6 md:p-10 justify-center items-center'>
        <h1 className='text-2xl md:text-3xl text-[#060606] font-semibold mb-1 mt-10'>Novels Nexus</h1>
        <h3 className='text-lg md:text-xl mb-1'>Login</h3>

        <form className="w-full max-w-[400px] flex flex-col" onSubmit={handleSubmit}>
          {error && (
            <div className="w-full bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          
          <input
            type="email"
            placeholder="Email"
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className='w-full flex items-center justify-between my-4'>
            <div className='flex items-center'>
              <input
                type='checkbox'
                className='w-4 h-4 mr-2'
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <p className='text-sm'>Remember Me</p>
            </div>
            {/* <p className='text-sm font-medium cursor-pointer underline'>Forgot Password?</p> */}
          </div>

          <div className='w-full flex flex-col my-4'>
            <button
              type="submit"
              className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'
              disabled={loading}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>

            <button
              type="button"
              className='w-full text-[#060606] my-2 font-semibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center'
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </button>
          </div>

          <div className='w-full flex items-center justify-center relative py-2'>
            <div className='w-full h-[1px] bg-black/40'></div>
            <p className='text-lg absolute text-black/80 bg-[#f5f5f5] px-2'>or</p>
          </div>

          <div className='w-full flex items-center justify-center bg-white border border-black/40 rounded-md my-4 p-4 cursor-pointer'>
            <img src={googleIcon} className='h-6 mr-2' alt="Google Icon" />
            Sign in with Google
          </div>
        </form>

        <div className='w-full flex items-center justify-center mt-6'>
          <p className='text-sm text-[#060606]'>
            Don't have an account?{' '}
            <span
              className='font-semibold underline cursor-pointer'
              onClick={() => navigate('/signup')}
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
