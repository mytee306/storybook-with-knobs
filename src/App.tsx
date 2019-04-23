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
}) => {
  return (
    <form className="App">
      <label>
        Name:
        <input type="text" value={name} />
      </label>
      <label>
        Age:
        <input type="text" value={age} />
      </label>
      <label>
        Employed:
        <input type="text" value={JSON.stringify(employed)} />
      </label>
      <label>
        Hobbies:
        <input type="text" value={hobbies} />
      </label>
      <fieldset>
        {Object.entries(languages).map(([language, level]) => (
          <label>
            {language}:
            <input value={level} />
          </label>
        ))}
      </fieldset>
      <label>
        Birthday:
        <input type="text" value={birthday.toLocaleDateString()} />
      </label>
    </form>
  );
};

export default App;
