import React from 'react';
import App from './App';
import { storiesOf } from '@storybook/react';
import {
  personalInformation,
  PersonalInformation,
} from './mocks/personalInformation';
import mockObjectToKnobs from './utils/mockObjectToKnobs';

const personalInformationWithKnobs = mockObjectToKnobs(
  personalInformation,
) as PersonalInformation;

storiesOf('App', module).add('Default', () => <App {...personalInformation} />);
