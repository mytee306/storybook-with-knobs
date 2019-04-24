# With Knobs 🎛

## Usage

Import `withKnobs` as default from `'with-knobs'` and use it to wrap an arbitrary object to get out of the box support for [storybook knobs](https://www.npmjs.com/package/@storybook/addon-knobs)

## Example

`.storybook/config.ts`

```ts
import { configure, addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

const requireContext = require.context('../src', true, /\.stories\.tsx$/);

function loadStories() {
  addDecorator(withKnobs);

  requireContext.keys().forEach(requireContext);
}

configure(loadStories, module);
```

`.storybook/addons.ts`

```ts
import '@storybook/addon-knobs/register';
```

`src/App.stories.tsx`

```tsx
import { storiesOf } from '@storybook/react';
import React from 'react';
import withKnobs from '../dist/withKnobs';
import App from './App';
import { personalInformation } from './mocks/personalInformation';

storiesOf('App', module).add('Default', () => {
  return <App {...withKnobs(personalInformation)} />;
});
```

`src/App.tsx`

```tsx
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
```

`src/mocks/personalInformation.ts`

```ts
export interface PersonalInformation {
  name: string;
  age: number;
  birthday: Date;
  employed: boolean;
  hobbies: string[];
  languages: { [language: string]: string };
  favoriteColor: string;
}

export const personalInformation: PersonalInformation = {
  name: 'John',
  age: 25,
  employed: true,
  favoriteColor: '#eee',
  hobbies: ['Running', 'Reading'],
  languages: {
    english: 'Mother Language',
    german: 'Proficient',
  },
  birthday: new Date('Jan 1 1994'),
};
```
