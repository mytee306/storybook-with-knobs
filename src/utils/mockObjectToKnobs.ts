import * as knobs from '@storybook/addon-knobs';
import { startCase } from 'lodash';
import { fromPairs, pipe } from 'ramda';

type Value = string | number | boolean | Array<{}> | Object | Function;

type MockObject = { [key: string]: Value };

type MockPair = [string, Value];

type MockPairs = MockPair[];

const types = ['number', 'string', 'boolean', 'object', 'function'];

const prepareMockObject = (mockObject: MockObject): MockPairs =>
  Object.entries(mockObject).map(([key, value]) => [startCase(key), value]);

const filterMockArray = (mockPair: MockPairs) =>
  mockPair.filter(([, value]) => types.includes(typeof value));

const mockPairToKnobs = ([label, value]: MockPair) => {
  const type = typeof value;

  if (typeof value === 'string' && type.startsWith('#')) {
    return knobs.color(label, value);
  } else if (typeof value === 'string') {
    return knobs.text(label, value);
  } else if (Array.isArray(value)) {
    return knobs.array(label, value);
  } else if (type === 'object' && value instanceof Date) {
    return knobs['date'](label, value);
  } else {
    return (knobs as any)[type](label, value);
  }
};

const mockArrayToKnobs = (mockPairs: MockPairs) =>
  mockPairs.map(mockPairToKnobs);

export default pipe(
  prepareMockObject,
  filterMockArray,
  mockArrayToKnobs,
  fromPairs as any,
);
