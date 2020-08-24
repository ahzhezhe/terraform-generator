import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Module } from '../../src';
import { arg4 } from '..';

test('Module', () => {
  const module = new Module('name', arg4);
  expect(module.toString()).toMatchSnapshot();
  expect(module.asArgument().toString()).toBe(TerraformGeneratorUtils.escape('module.name'));
  expect(module.attr('attr').toString()).toBe(TerraformGeneratorUtils.escape('module.name.attr'));
});
