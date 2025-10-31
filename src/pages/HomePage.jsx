import React from 'react';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { currentUser } = useAuth();
  return (
    <div className="page">
      <h1>Welcome to the User Account App</h1>
      {currentUser ? (
        <p>You are logged in as {currentUser.name}.</p>
      ) : (
        <p>Please log in or register to manage your account.</p>
      )}
    </div>
  );
};

export default HomePage;