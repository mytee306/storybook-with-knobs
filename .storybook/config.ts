import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';
import { withSmartKnobs } from 'storybook-addon-smart-knobs';

const requireContext = require.context('../src', true, /\.story\.tsx$/);

function loadStories() {
  addDecorator(withInfo);
  addDecorator(withKnobs);
  addDecorator(withSmartKnobs);

  requireContext.keys().forEach(requireContext);
}

configure(loadStories, module);
