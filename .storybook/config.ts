import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';
import { withKnobs } from '@storybook/addon-knobs';

const requireContext = require.context('../src', true, /\.story\.tsx$/);

function loadStories() {
  addDecorator(withInfo);
  addDecorator(withKnobs);

  requireContext.keys().forEach(requireContext);
}

configure(loadStories, module);
