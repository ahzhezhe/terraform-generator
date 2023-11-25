import { arg1, arg2, arg3, arg4 } from '..';
import { List, list } from '../../src/arguments';

test('List', () => {
  expect(new List('x', 'y', 'z').toTerraform()).toMatchSnapshot();
  expect(new List(1, 2, 3).toTerraform()).toMatchSnapshot();
  expect(new List(true, false, true).toTerraform()).toMatchSnapshot();
  expect(new List('x', 2, true).toTerraform()).toMatchSnapshot();
  expect(new List(arg1, arg2, arg3, arg4).toTerraform()).toMatchSnapshot();
});

test('list', () => {
  expect(list('x', 'y', 'z').toTerraform()).toMatchSnapshot();
  expect(list(1, 2, 3).toTerraform()).toMatchSnapshot();
  expect(list(true, false, true).toTerraform()).toMatchSnapshot();
  expect(list('x', 2, true).toTerraform()).toMatchSnapshot();
  expect(list(arg1, arg2, arg3, arg4).toTerraform()).toMatchSnapshot();
});
