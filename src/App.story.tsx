import React from 'react';
import App from './App';
import { storiesOf } from '@storybook/react';
import { personalInformation } from './mocks/personalInformation';

storiesOf('App', module).add('Default', () => <App {...personalInformation} />);
