// CharacterCard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CharacterCard.css';

const CharacterCard = ({ character, onClick }) => {
  const [speciesName, setSpeciesName] = useState('');
  const randomImageId = Math.floor(Math.random() * 1000);
  const imageUrl = `https://picsum.photos/200/300?random=${randomImageId}`;
  

  useEffect(() => {
    const fetchSpecies = async () => {
      try {
        if (character.species.length > 0) {
          const speciesResponse = await axios.get(character.species[0]); // Assuming only one species URL
          setSpeciesName(speciesResponse.data.name);
        } else {
          setSpeciesName('no-species'); // Set species name to indicate no species
        }
      } catch (error) {
        console.error('Error fetching species:', error);
      }
    };

    fetchSpecies();
  }, [character.species]);

  return (
    <div className={`species-${speciesName.toLowerCase().replace(/['\s]/g, '-')} ${speciesName === "Yoda's species" ? 'species-yodas-species' : ''}`} onClick={() => onClick(character)}>
      <img src={imageUrl} alt="Character" />
      <div className="character-details">
        <h2>{character.name}</h2>
        <p>Species: {speciesName}</p>
      </div>
    </div>
  );
};

export default CharacterCard;
