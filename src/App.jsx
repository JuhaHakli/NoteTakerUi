import React, { useState } from 'react';
import NoteGrid from './components/NoteGrid';
import './App.css';
import SearchBar from './components/SearchBar';

function App() {
  const [search, setSearch] = useState('');
  function handleChange(value) {
    setSearch(value);
  }

  return (
    <div className="app-container">
      <h1>Muistilaputtaja</h1>
      <SearchBar handleChange={handleChange} />
      <NoteGrid search={search} />
    </div>
  );
}

export default App;
