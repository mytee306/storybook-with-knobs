import * as knobs from '@storybook/addon-knobs';
import { startCase } from 'lodash';

type MockPair = [string, any];
type MockPairs = MockPair[];

const supportedTypes = ['number', 'string', 'boolean', 'object'];

const filterMockArray = (mockPairs: MockPairs) =>
  mockPairs.filter(([, value]) => supportedTypes.includes(typeof value));

// knobs does not have an index signature
const mockPairToKnobs = ([key, value]: MockPair): MockPair => {
  const label = startCase(key);

  if (typeof value === 'string' && value.startsWith('#')) {
    // type guards require typeof in condition
    return [key, knobs.color(label, value)];
  } else if (typeof value === 'string') {
    return [key, knobs.text(label, value)];
  } else if (Array.isArray(value)) {
    return [key, knobs.array(label, value)];
  } else if (value instanceof Date) {
    return [key, new Date(knobs.date(label, value))];
  } else if (typeof value === 'number') {
    return [key, knobs.number(label, value)];
  } else if (typeof value === 'boolean') {
    return [key, knobs.boolean(label, value)];
  } else {
    return [key, knobs.object(label, value)];
  }
};

const mockArrayToKnobs = (mockPairs: MockPairs) =>
  mockPairs.map(mockPairToKnobs);

type Pipe = <A, B>(f: (a: A) => B) => <C>(g: (a: B) => C) => (a: A) => C;
const pipe: Pipe = f => g => a => g(f(a));

const fromEntries = <Value>(entries: [string, Value][]) =>
  entries.reduce(
    (object, [key, value]) => ({ ...object, [key]: value }),
    {} as { [key: string]: Value },
  );

const mockObjectToKnobs = pipe(Object.entries)(
  pipe(filterMockArray)(pipe(mockArrayToKnobs)(fromEntries)),
);

export default <MockObject>(mockObject: MockObject) =>
  mockObjectToKnobs(mockObject) as MockObject;
