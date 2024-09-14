import logo from './logo.svg';
import './App.css';


import React from 'react';
import SearchBar from './components/SearchBar';
import GoogleLoginButton from './components/GoogleLoginButton';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container mt-5">
      <GoogleLoginButton />
      <SearchBar />
    </div>
  );
}

export default App;
