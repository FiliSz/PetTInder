import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faTimes } from '@fortawesome/free-solid-svg-icons';

function ChatSidebar({ favoriteProfiles, onSelectProfile, onRemoveFavorite, isMinimized, onToggleMinimized }) {
  return (
    <div className={`chat-sidebar ${isMinimized ? 'minimized' : ''}`}>
      <div className="sidebar-header">
        <h2>Ulubieni</h2>
        <button className="icon-button" onClick={onToggleMinimized}>
          <FontAwesomeIcon icon={faWindowMinimize} />
        </button>
      </div>
      {!isMinimized && (
        <ul>
          {favoriteProfiles.map((profile, index) => (
            <li key={index} className="chat-sidebar-item">
              <img className="chat-sidebar-avatar" src={profile.picture.thumbnail} alt={`${profile.name.first} ${profile.name.last}`} />
              <div className="chat-sidebar-details" onClick={() => onSelectProfile(profile)}>
                <h3>{`${profile.name.first} ${profile.name.last}`}</h3>
                <p>{profile.location.country}</p>
              </div>
              <button className="icon-button remove-button" onClick={() => onRemoveFavorite(profile.login.uuid)}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ChatSidebar;
