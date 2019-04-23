import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { personalInformation } from './mocks/personalInformation';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App {...personalInformation} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
