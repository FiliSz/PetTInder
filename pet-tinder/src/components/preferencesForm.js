import React, { useState } from 'react';

function PreferencesForm({ onPreferencesSelected }) {
  const [country, setCountry] = useState('');
  const [gender, setGender] = useState('');

  const handlePreferencesSubmit = () => {
    onPreferencesSelected(country, gender);
  };

  return (
    <div className="preferences-form">
      <h2>Wybierz swoje preferencje:</h2>
      <label>
        Wybierz kraj:
        <select value={country} onChange={(e) => setCountry(e.target.value)}>
          <option value="">Wszystkie</option>
          <option value="US">USA</option>
          <option value="CA">Kanada</option>
        </select>
      </label>
      <label>
        Wybierz płeć:
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Wszystkie</option>
          <option value="male">Mężczyzna</option>
          <option value="female">Kobieta</option>
        </select>
      </label>
      <button onClick={handlePreferencesSubmit}>Zatwierdź</button>
    </div>
  );
}

export default PreferencesForm;