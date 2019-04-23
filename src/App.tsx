import React from 'react';
import './App.css';
import { PersonalInformation } from './mocks/personalInformation';

export type AppProps = PersonalInformation;

const App: React.FC<AppProps> = ({
  name,
  age,
  birthday,
  employed,
  hobbies,
  languages,
  favoriteColor,
}) => {
  return (
    <form className="App">
      <label>
        Name:
        <input readOnly type="text" value={name} />
      </label>
      <label>
        Favorite Color:
        <input readOnly type="text" value={favoriteColor} />
      </label>
      <label>
        Age:
        <input readOnly type="text" value={age} />
      </label>
      <label>
        Employed:
        <input readOnly type="text" value={JSON.stringify(employed)} />
      </label>
      <label>
        Hobbies:
        <input readOnly type="text" value={hobbies} />
      </label>
      <fieldset>
        {Object.entries(languages).map(([language, level]) => (
          <label key={language}>
            {language}:
            <input readOnly value={level} />
          </label>
        ))}
      </fieldset>
      <label>
        Birthday:
        <input readOnly type="text" value={birthday.toLocaleDateString()} />
      </label>
    </form>
  );
};

export default App;
