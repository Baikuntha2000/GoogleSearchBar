import logo from './logo.svg';
import './App.css';


import React from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import SearchBar from './components/SearchBar';

const App = () => {
  return (
    <GoogleOAuthProvider clientId="YOUR_CLIENT_ID">
      <div className="App">
        <SearchBar />
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;

