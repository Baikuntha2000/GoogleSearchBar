import React, { useState, useEffect, useRef } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import countriesData from '../countriesdata'; // Make sure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMicrophone, faCamera } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css'; // Import your styling

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showResults, setShowResults] = useState(false); // Manage the visibility of results
  const resultsRef = useRef(null); // Reference to the results container

  useEffect(() => {
    // Close results when clicking outside
    const handleClickOutside = (event) => {
      if (resultsRef.current && !resultsRef.current.contains(event.target)) {
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = countriesData.filter((country) =>
      country.country.toLowerCase().startsWith(value) ||
      country.capital.toLowerCase().startsWith(value)
    );
    
    setFilteredCountries(filtered);
    setShowResults(value.length > 0); // Show results if there is input
  };

  const handleLoginSuccess = (response) => {
    console.log('Login Success:', response);
    // Handle successful login
  };

  const handleLoginError = (error) => {
    console.error('Login Failed:', error);
    // Handle failed login
  };

  return (
    <div className="search-bar-wrapper">
      <div className="search-bar-container">
        <FontAwesomeIcon icon={faSearch} className="icon search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search by country or capital..."
          className="search-input"
        />
        <FontAwesomeIcon icon={faMicrophone} className="icon mic-icon" />
        <FontAwesomeIcon icon={faCamera} className="icon photo-scan-icon" />
      </div>

      {/* Display Results Below the Search Bar */}
      {showResults && (
        <div className="results-container" ref={resultsRef}>
          {filteredCountries.length > 0 ? (
            <ul className="list-group">
              {filteredCountries.map((country, index) => (
                <li key={index} className="list-group-item">
                  {country.country} - {country.capital}
                </li>
              ))}
            </ul>
          ) : (
            searchTerm && <p className="no-results">No results found</p>
          )}
        </div>
      )}

      {/* Google Login Button */}
      <div className="google-login-container">
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={handleLoginError}
        />
      </div>
    </div>
  );
};

export default SearchBar;
