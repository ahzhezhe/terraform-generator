import { arg4 } from '..';
import { Module } from '../../src/blocks';
import { Util } from '../../src/utils';

test('Module', () => {
  const module = new Module('name', {
    source: 'source',
    version: '1',
    ...arg4
  });
  expect(module.toTerraform()).toMatchSnapshot();
  expect(module.asArgument().toTerraform()).toBe(Util.escape('module.name'));
  expect(module.attr('attr').toTerraform()).toBe(Util.escape('module.name.attr'));
});
