import { attr } from '..';
import { Function, fn } from '../../src/arguments';

test('Function', () => {
  expect(new Function('fn').toTerraform()).toMatchSnapshot();
  expect(new Function('fn', 'x', 'y', 'z').toTerraform()).toMatchSnapshot();
  expect(new Function('fn', 1, 2, 3).toTerraform()).toMatchSnapshot();
  expect(new Function('fn', true, false, true).toTerraform()).toMatchSnapshot();
  expect(new Function('fn', 'x', 2, true).toTerraform()).toMatchSnapshot();
  expect(new Function('fn', 'x', attr).toTerraform()).toMatchSnapshot();
  expect(new Function('fn', 'x', { a: 1, b: '2' }).toTerraform()).toMatchSnapshot();
});

test('fn', () => {
  expect(fn('fn').toTerraform()).toMatchSnapshot();
  expect(fn('fn', 'x', 'y', 'z').toTerraform()).toMatchSnapshot();
  expect(fn('fn', 1, 2, 3).toTerraform()).toMatchSnapshot();
  expect(fn('fn', true, false, true).toTerraform()).toMatchSnapshot();
  expect(fn('fn', 'x', 2, true).toTerraform()).toMatchSnapshot();
  expect(fn('fn', 'x', attr).toTerraform()).toMatchSnapshot();
  expect(fn('fn', 'x', { a: 1, b: '2' }).toTerraform()).toMatchSnapshot();
});
