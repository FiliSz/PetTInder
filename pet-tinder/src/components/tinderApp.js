import React, { useState, useEffect } from 'react';
import PreferencesForm from './PreferencesForm';
import FavoriteProfilesList from './FavoriteProfilesList';
import ChatSidebar from './ChatSidebar';
import ChatWindow from './ChatWindow';

function TinderApp() {
  const [profile, setProfile] = useState(null);
  const [likedProfiles, setLikedProfiles] = useState([]);
  const [searchOptions, setSearchOptions] = useState({ country: '', gender: '' });
  const [showPreferences, setShowPreferences] = useState(true);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [messages, setMessages] = useState({});
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  const [isFavoritesMinimized, setIsFavoritesMinimized] = useState(false);

  useEffect(() => {
    if (!showPreferences) {
      fetchRandomProfile(searchOptions.country, searchOptions.gender);
    }
  }, [showPreferences, searchOptions]);

  async function fetchRandomProfile(country, gender) {
    try {
      let apiUrl = 'https://randomuser.me/api/';

      if (country) {
        apiUrl += `?nat=${country}`;
      }

      if (gender) {
        if (apiUrl.includes('?')) {
          apiUrl += `&gender=${gender}`;
        } else {
          apiUrl += `?gender=${gender}`;
        }
      }

      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.results && data.results.length > 0) {
        setProfile(data.results[0]);
      } else {
        throw new Error('Brak profili.');
      }
    } catch (error) {
      console.error('błąd:', error);
    }
  }

  const handlePreferencesSelected = (country, gender) => {
    setSearchOptions({ country, gender });
    setShowPreferences(false);
  };

  const handleLike = () => {
    if (profile) {
      const isAlreadyLiked = likedProfiles.some(
        (likedProfile) => likedProfile.login.uuid === profile.login.uuid
      );
      if (!isAlreadyLiked) {
        setLikedProfiles([...likedProfiles, profile]);
      }
    }
    fetchRandomProfile(searchOptions.country, searchOptions.gender);
  };

  const handleDislike = () => {
    fetchRandomProfile(searchOptions.country, searchOptions.gender);
  };

  const handleSelectProfile = (profile) => {
    setSelectedProfile(profile);
    setIsChatMinimized(false); // Otwórz chat przy wyborze profilu
  };

  const handleCloseChat = () => {
    setSelectedProfile(null);
  };

  const handleSendMessage = (profileId, message) => {
    setMessages((prevMessages) => ({
      ...prevMessages,
      [profileId]: [...(prevMessages[profileId] || []), message]
    }));
  };

  const handleRemoveFavorite = (profileId) => {
    setLikedProfiles(likedProfiles.filter((profile) => profile.login.uuid !== profileId));
  };

  const toggleChatMinimized = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  const toggleFavoritesMinimized = () => {
    setIsFavoritesMinimized(!isFavoritesMinimized);
  };

  return (
    <div className="tinder-app">
      {showPreferences ? (
        <PreferencesForm onPreferencesSelected={handlePreferencesSelected} />
      ) : (
        profile && (
          <div className="profile-card">
            <img src={profile.picture.large} alt={`${profile.name.first} ${profile.name.last}`} />
            <h2>{`${profile.name.first} ${profile.name.last}`}</h2>
            <p>{profile.location.country}</p>
            <div className="buttons">
              <button onClick={handleLike}>Polub</button>
              <button onClick={handleDislike}>Odrzuć</button>
            </div>
          </div>
        )
      )}
      {likedProfiles.length > 0 && (
        <ChatSidebar 
          favoriteProfiles={likedProfiles} 
          onSelectProfile={handleSelectProfile} 
          onRemoveFavorite={handleRemoveFavorite}
          isMinimized={isFavoritesMinimized}
          onToggleMinimized={toggleFavoritesMinimized}
        />
      )}
      {selectedProfile && (
        <ChatWindow
          key={selectedProfile.login.uuid}
          selectedProfile={selectedProfile}
          onClose={handleCloseChat}
          messages={messages[selectedProfile.login.uuid] || []}
          onSendMessage={(message) => handleSendMessage(selectedProfile.login.uuid, message)}
          isMinimized={isChatMinimized}
          onToggleMinimized={toggleChatMinimized}
        />
      )}
    </div>
  );
}

export default TinderApp;
