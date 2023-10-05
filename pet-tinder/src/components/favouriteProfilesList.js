import React, { useState } from 'react';

function FavoriteProfilesList({ favoriteProfiles }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < favoriteProfiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="favorite-profiles-list">
      <h2>Ulubione profile:</h2>
      {favoriteProfiles.length === 0 ? (
        <p>Brak ulubionych profili.</p>
      ) : (
        <div>
          <ul>
            <li key={currentIndex}>
              <img src={favoriteProfiles[currentIndex].picture.large} alt={`${favoriteProfiles[currentIndex].name.first} ${favoriteProfiles[currentIndex].name.last}`} />
              <h3>{`${favoriteProfiles[currentIndex].name.first} ${favoriteProfiles[currentIndex].name.last}`}</h3>
              <p>{favoriteProfiles[currentIndex].location.country}</p>
              <p>Email: {favoriteProfiles[currentIndex].email}</p>
              <p>Telefon: {favoriteProfiles[currentIndex].phone}</p>
            </li>
          </ul>
            
                <button onClick={handlePrevious}>Poprzedni</button>
                <button onClick={handleNext}>Następny</button>
            
        </div>
      )}
    </div>
  );
}

export default FavoriteProfilesList;