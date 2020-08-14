import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Module } from '../../src';
import { arg4 } from '..';

test('Module', () => {
  const module = new Module('name', arg4);
  expect(module.toTerraform('0.11')).toMatchSnapshot();
  expect(module.toTerraform('0.12')).toMatchSnapshot();
  expect(module.asArgument().toTerraform()).toBe(TerraformGeneratorUtils.escape('module.name'));
  expect(module.attr('attr').toTerraform()).toBe(TerraformGeneratorUtils.escape('module.name.attr'));
});
