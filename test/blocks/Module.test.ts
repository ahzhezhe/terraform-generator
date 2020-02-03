import { Module } from '../../src';
import { arg4 } from '.';

test('Module', () => {
  const module = new Module('name', arg4);
  expect(module.toTerraform('0.11')).toMatchSnapshot();
  expect(module.toTerraform('0.12')).toMatchSnapshot();
  expect(module.asArgument().toTerraform()).toMatchSnapshot();
  expect(module.getAttribute('attr').toTerraform()).toMatchSnapshot();
});
