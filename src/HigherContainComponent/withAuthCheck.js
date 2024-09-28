import React from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthCheck = (WrappedComponent) => {
  return function AuthCheckComponent(props) {
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    if (!token) {
      alert('Please log in to access this page.');
      navigate('/login');
      return null;
    }

    return <WrappedComponent {...props} />;
  };
};

export default withAuthCheck;
