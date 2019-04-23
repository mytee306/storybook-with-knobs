import { storiesOf } from '@storybook/react';
import React from 'react';
import mockObjectToKnobs from '../dist/withKnobs';
import App from './App';
import { personalInformation } from './mocks/personalInformation';

storiesOf('App', module).add('Default', () => {
  return <App {...mockObjectToKnobs(personalInformation)} />;
});
