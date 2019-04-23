import * as knobs from '@storybook/addon-knobs';
import { startCase } from 'lodash';
import { fromPairs, pipe, toPairs } from 'ramda';

type Value = string | number | boolean | Array<{}> | Object | Function;

type MockObject = { [key: string]: Value };

type MockPair = [string, Value];

type MockPairs = MockPair[];

const types = ['number', 'string', 'boolean', 'object', 'function'];

const filterMockArray = (mockPair: MockPairs) =>
  mockPair.filter(([, value]) => types.includes(typeof value));

const mockPairToKnobs = ([key, value]: MockPair) => {
  const type = typeof value;

  const label = startCase(key);

  if (typeof value === 'string' && type.startsWith('#')) {
    return [key, knobs.color(label, value)];
  } else if (typeof value === 'string') {
    return [key, knobs.text(label, value)];
  } else if (Array.isArray(value)) {
    return [key, knobs.array(label, value)];
  } else if (type === 'object' && value instanceof Date) {
    return [key, new Date(knobs.date(label, value))];
  } else {
    return [key, (knobs as any)[type](label, value)];
  }
};

const mockArrayToKnobs = (mockPairs: MockPairs) =>
  mockPairs.map(mockPairToKnobs);

export default (pipe as any)(
  toPairs,
  filterMockArray,
  mockArrayToKnobs,
  fromPairs,
);
