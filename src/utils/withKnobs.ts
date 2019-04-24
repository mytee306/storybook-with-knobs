import * as knobs from '@storybook/addon-knobs';
import { startCase } from 'lodash';

type MockObject = { [key: string]: any };
type MockEntry = [string, any];
type MockEntries = MockEntry[];

// for more information check out https://www.debuggex.com/r/vpn4CGZFfeN7WR1_
const dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]|(?:Jan|Mar|May|Jul|Aug|Oct|Dec)))\1|(?:(?:29|30)(\/|-|\.)(?:0?[1,3-9]|1[0-2]|(?:Jan|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)(?:0?2|(?:Feb))\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9]|(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep))|(?:1[0-2]|(?:Oct|Nov|Dec)))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})/;

// knobs does not have an index signature
const mockEntryToKnobs = ([key, value]: MockEntry): MockEntry => {
  const label = startCase(key);

  if (typeof value === 'string' && value.startsWith('#')) {
    // type guards require typeof operator in condition
    return [key, knobs.color(label, value)];
  } else if (value instanceof Date || dateRegex.test(value)) {
    return [key, new Date(knobs.date(label, value))];
  } else if (typeof value === 'string') {
    return [key, knobs.text(label, value)];
  } else if (Array.isArray(value)) {
    return [key, knobs.array(label, value)];
  } else if (typeof value === 'number') {
    return [key, knobs.number(label, value)];
  } else if (typeof value === 'boolean') {
    return [key, knobs.boolean(label, value)];
  } else {
    return [key, knobs.object(label, value)];
  }
};

const mockEntriesToKnobs = (mockEntries: MockEntries) =>
  mockEntries.map(mockEntryToKnobs);

type Pipe = <A, B>(f: (a: A) => B) => <C>(g: (a: B) => C) => (a: A) => C;
const pipe: Pipe = f => g => a => g(f(a));

const fromEntries = <Value>(entries: [string, Value][]) =>
  entries.reduce(
    (object, [key, value]) => ({ ...object, [key]: value }),
    {} as { [key: string]: Value },
  );

const withKnobs = (mock: MockObject) =>
  pipe(Object.entries)(pipe(mockEntriesToKnobs)(fromEntries))(mock);

export default <Mock extends MockObject>(mockObject: Mock) =>
  withKnobs(mockObject) as Mock;
