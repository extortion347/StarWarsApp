// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CharacterCard from '../src/components/submodals/CharacterCard';
import Modal from '../src/components/submodals/Modal';
import Loader from '../src/components/submodals/Loader';
import Error from '../src/components/submodals/Error';
import './App.css';

function App() {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://swapi.dev/api/people/?page=${currentPage}`);
        setCharacters(response.data.results);
        setLoading(false);
        setTotalPages(Math.ceil(response.data.count / 10)); // Assuming 10 characters per page
      } catch (error) {
        setError('Error fetching characters. Please try again later.');
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage, setCharacters, setLoading, setTotalPages]);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const closeModal = () => {
    setSelectedCharacter(null);
  };

  return (
    <div className="app">
      <h1>Star Wars Characters</h1>
      {loading && <Loader />}
      {error && <Error message={error} />}
      <div className="character-container">
        {characters.map((character, index) => (
          <CharacterCard
            key={index}
            character={character}
            onClick={() => handleCharacterClick(character)}
          />
        ))}
      </div>
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
        <span>{currentPage} of {totalPages}</span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
      </div>
      {selectedCharacter && <Modal character={selectedCharacter} onClose={closeModal} />}
    </div>
  );
}

export default App;
