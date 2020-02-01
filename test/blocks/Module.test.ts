import { Module } from '../..';
import { tfGenerator11, tfGenerator12, arg4 } from '.';

test('Module 0.11', () => {
  const module = new Module(tfGenerator11, 'name', arg4(tfGenerator11));
  expect(module.toTerraform()).toMatchSnapshot();
  expect(module.asArgument().toTerraform()).toMatchSnapshot();
  expect(module.getAttribute('attr').toTerraform()).toMatchSnapshot();
});

test('Module 0.12', () => {
  const module = new Module(tfGenerator12, 'name', arg4(tfGenerator12));
  expect(module.toTerraform()).toMatchSnapshot();
  expect(module.asArgument().toTerraform()).toMatchSnapshot();
  expect(module.getAttribute('attr').toTerraform()).toMatchSnapshot();
});
