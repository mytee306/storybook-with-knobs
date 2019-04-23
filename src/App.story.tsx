import React from 'react';
import App from './App';
import { storiesOf } from '@storybook/react';
import { personalInformation } from './mocks/personalInformation';
import mockObjectToKnobs from './utils/mockObjectToKnobs';

storiesOf('App', module).add('Default', () => {
  return <App {...mockObjectToKnobs(personalInformation)} />;
});
