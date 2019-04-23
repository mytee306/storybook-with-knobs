import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

const requireContext = require.context('../src', true, /\.story\.tsx$/);

function loadStories() {
  addDecorator(withInfo);

  requireContext.keys().forEach(requireContext);
}

configure(loadStories, module);
