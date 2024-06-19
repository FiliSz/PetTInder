import React from 'react';

function FavoriteProfilesList({ favoriteProfiles, onRemoveFavorite, isMinimized, onToggleMinimized }) {
  return (
    <div className={`favorite-profiles-list ${isMinimized ? 'minimized' : ''}`}>
      <div className="header">
        <h2>Ulubione profile:</h2>
        <button onClick={onToggleMinimized}>{isMinimized ? 'Rozwiń' : 'Zwiń'}</button>
      </div>
      {!isMinimized && (
        <ul>
          {favoriteProfiles.map((profile, index) => (
            <li key={index}>
              <img src={profile.picture.large} alt={`${profile.name.first} ${profile.name.last}`} />
              <h3>{`${profile.name.first} ${profile.name.last}`}</h3>
              <p>{profile.location.country}</p>
              <p>Email: {profile.email}</p>
              <p>Telefon: {profile.phone}</p>
              <button className="remove-button" onClick={() => onRemoveFavorite(profile.login.uuid)}>X</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default FavoriteProfilesList;
