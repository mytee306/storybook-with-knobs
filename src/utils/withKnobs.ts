import * as knobs from '@storybook/addon-knobs';
import { startCase } from 'lodash';

type MockEntry = [string, any];
type MockEntries = MockEntry[];

// knobs does not have an index signature
const mockEntryToKnobs = ([key, value]: MockEntry): MockEntry => {
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

const mockEntriesToKnobs = (mockPairs: MockEntries) =>
  mockPairs.map(mockEntryToKnobs);

type Pipe = <A, B>(f: (a: A) => B) => <C>(g: (a: B) => C) => (a: A) => C;
const pipe: Pipe = f => g => a => g(f(a));

const fromEntries = <Value>(entries: [string, Value][]) =>
  entries.reduce(
    (object, [key, value]) => ({ ...object, [key]: value }),
    {} as { [key: string]: Value },
  );

const withKnobs = pipe(Object.entries)(pipe(mockEntriesToKnobs)(fromEntries));

export default <MockObject>(mockObject: MockObject) =>
  withKnobs(mockObject) as MockObject;
