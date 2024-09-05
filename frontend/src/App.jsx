import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignUpPage';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import HomePage from './components/HomePage';
import BookDetails from "./components/BookDetails";
import ReviewDetails from "./components/ReviewDetails";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    const token = Cookies.get('token');

    if (token) {
      try {
        const decoded = jwtDecode(token);
        console.log('Decoded token:', decoded);

        if (decoded && decoded.exp > Date.now() / 1000) {
          setIsAuthenticated(true);
        } else {
          console.log(decoded.exp)
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.log('Token decoding error:', error);
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />

        <Route
          path="/home"
          element={
            isAuthenticated ? <HomePage /> : <Navigate to="/" />
          }
        />

        <Route
          path="/novels/:id"
          element={
            isAuthenticated ? <BookDetails /> : <Navigate to="/" />
          }
        />

        <Route
          path="/novels/:novelId/reviews/:reviewId"
          element={
            isAuthenticated ? <ReviewDetails /> : <Navigate to="/" />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
