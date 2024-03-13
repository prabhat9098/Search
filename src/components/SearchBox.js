// src/components/SearchBox.js
import React, { useState, useEffect } from 'react';

const SearchBox = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(query);
    }
  };

  const handleFocusShortcut = (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key === '/') {
      event.preventDefault();
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleFocusShortcut);
    return () => {
      window.removeEventListener('keydown', handleFocusShortcut);
    };
  }, [handleFocusShortcut]);

  const inputRef = React.createRef();

  return (
    <input
      ref={inputRef}
      type="text"
      placeholder="Search places..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyPress={handleKeyPress}
    />
  );
};

export default SearchBox;
