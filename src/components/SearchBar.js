import React, { useState, useEffect, useRef } from 'react';
import countriesData from '../countriesdata';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faMicrophone, faCamera } from '@fortawesome/free-solid-svg-icons';
import './SearchBar.css'; 

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);
  const searchRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setFilteredCountries([]);
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
  };

  return (
    <div className="search-bar-wrapper" ref={searchRef}>
     
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

      
      {filteredCountries.length > 0 && (
        <div className="results-container">
          {filteredCountries.map((country, index) => (
            <div key={index} className="result-item">
              {country.country} - {country.capital}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
