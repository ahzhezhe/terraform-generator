import { arg4 } from '..';
import { Module } from '../../src';
import { Util } from '../../src/Util';

test('Module', () => {
  const module = new Module('name', arg4);
  expect(module.toTerraform()).toMatchSnapshot();
  expect(module.asArgument().toTerraform()).toBe(Util.escape('module.name'));
  expect(module.attr('attr').toTerraform()).toBe(Util.escape('module.name.attr'));
});
