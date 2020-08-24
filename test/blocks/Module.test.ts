import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Module } from '../../src';
import { arg4 } from '..';

test('Module', () => {
  const module = new Module('name', arg4);
  expect(module.toTerraform()).toMatchSnapshot();
  expect(module.asArgument().toTerraform()).toBe(TerraformGeneratorUtils.escape('module.name'));
  expect(module.attr('attr').toTerraform()).toBe(TerraformGeneratorUtils.escape('module.name.attr'));
});
