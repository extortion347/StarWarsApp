import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './Modal.css';

function Modal({ character, onClose }) {
  const [homeworldInfo, setHomeworldInfo] = useState(null);
  const [speciesName, setSpeciesName] = useState('');

  useEffect(() => {
    const fetchSpeciesName = async () => {
      try {
        if (character.species.length > 0) {
          const speciesResponse = await axios.get(character.species[0]);
          setSpeciesName(speciesResponse.data.name);
        } else {
          setSpeciesName('Unknown');
        }
      } catch (error) {
        console.error('Error fetching species name:', error);
        setSpeciesName('Unknown');
      }
    };

    fetchSpeciesName();
  }, [character.species]);

  useEffect(() => {
    const fetchHomeworldInfo = async () => {
      try {
        const homeworldResponse = await axios.get(character.homeworld);
        setHomeworldInfo(homeworldResponse.data);
      } catch (error) {
        console.error('Error fetching homeworld information:', error);
      }
    };

    fetchHomeworldInfo();
  }, [character.homeworld]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          className="text-orange-600 hover:text-orange-800 close-btn"
          type="button"
          onClick={onClose} // Close the modal when the close button is clicked
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div className="modal-header">
          <h2>{character.name}</h2>
        </div>
        <div className="modal-body">
          <div className="character-image">
            <img src={`https://picsum.photos/200/300?random=${character.id}`} alt="Character" />
          </div>
          <div className="character-details">
            <p>Height: {character.height} meters</p>
            <p>Mass: {character.mass} kg</p>
            <p>Date Added: {new Date(character.created).toLocaleDateString('en-GB')}</p>
            <p>Number of Films: {character.films.length}</p>
            <p>Birth Year: {character.birth_year}</p>
            <h3>Homeworld Information</h3>
            {homeworldInfo && (
              <div>
                <p>Name: {homeworldInfo.name}</p>
                <p>Terrain: {homeworldInfo.terrain}</p>
                <p>Climate: {homeworldInfo.climate}</p>
                <p>Number of Residents: {homeworldInfo.residents.length}</p>
              </div>
            )}
            <h3>Species Information</h3>
            <p>Species: {speciesName}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
