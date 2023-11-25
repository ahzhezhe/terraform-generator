import { arg4 } from '..';
import { Map, map } from '../../src/arguments';

test('Map', () => {
  expect(new Map(arg4).toTerraform()).toMatchSnapshot();
});

test('list', () => {
  expect(map(arg4).toTerraform()).toMatchSnapshot();
});
