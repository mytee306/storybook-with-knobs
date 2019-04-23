import { configure, addDecorator } from '@storybook/react';
import { withInfo } from '@storybook/addon-info';

function requireAll(requireContext) {
  return requireContext.keys().map(requireContext);
}

function loadStories() {
  addDecorator(withInfo);

  requireAll(require.context('..', true, /story\.tsx?$/));
}

configure(loadStories, module);
