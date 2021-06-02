import React from 'react';
import PropTypes from 'prop-types';

function SearchBar({ handleChange }) {
  return (
    <div className="search-container">
      <label htmlFor="search">
        Haku
        <input id="search" className="search-bar" type="text" onChange={(event) => handleChange(event)} />
      </label>
    </div>
  );
}
SearchBar.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default SearchBar;
