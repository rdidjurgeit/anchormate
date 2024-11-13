import React, { useState } from 'react';

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = (e) => {
        setQuery(e.target.value);
        onSearch(e.target.value);
    };

    return (
        <input
            type="text"
            placeholder="Search for an anchorage..."
            value={query}
            onChange={handleSearch}
            className="form-control my-3"
        />
    );
};

export default SearchBar;