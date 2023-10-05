import React, { useState, useEffect } from 'react';
import PreferencesForm from './preferencesForm';
import FavoriteProfilesList from './favouriteProfilesList';


function TinderApp() {
    const [profile, setProfile] = useState(null);
    const [likedProfiles, setLikedProfiles] = useState([]);
    const [searchOptions, setSearchOptions] = useState({ country: '', gender: '' });
    const [showPreferences, setShowPreferences] = useState(true);
    const [showLikedProfiles, setShowLikedProfiles] = useState(false);
  
    useEffect(() => {
      if (!showPreferences && !showLikedProfiles) {
        fetchRandomProfile(searchOptions.country, searchOptions.gender);
      }
    }, [showPreferences, showLikedProfiles, searchOptions]);
  
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
          throw new Error('Brakprofili.');
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
        setLikedProfiles([...likedProfiles, profile]);
      }
      fetchRandomProfile(searchOptions.country, searchOptions.gender);
    };
  
    const handleDislike = () => {
      fetchRandomProfile(searchOptions.country, searchOptions.gender);
    };
  
    const handleShowLikedProfiles = () => {
      setShowLikedProfiles(true);
    };
  
    const handleCloseLikedProfiles = () => {
      setShowLikedProfiles(false);
    };
  
    return (
      <div className="tinder-app">
        {showPreferences ? (
          <PreferencesForm onPreferencesSelected={handlePreferencesSelected} />
        ) : (
          <>
            {showLikedProfiles ? (
              <>
                <FavoriteProfilesList favoriteProfiles={likedProfiles} />
                <button onClick={handleCloseLikedProfiles}>Zamknij ulubione</button>
              </>
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
          </>
        )}
        {!showPreferences && !showLikedProfiles && (
          <div className="header">
            <button onClick={handleShowLikedProfiles}>Ulubione</button>
          </div>
        )}
      </div>
    );
  }
  
  export default TinderApp;





