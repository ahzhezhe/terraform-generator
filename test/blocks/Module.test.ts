import { arg4 } from '..';
import { Module } from '../../src/blocks';

test('Module', () => {
  const module = new Module('name', {
    source: 'source',
    version: '1',
    ...arg4
  });
  expect(module.toTerraform()).toMatchSnapshot();
  expect(module.asArgument().toTerraform()).toMatchSnapshot();
  expect(module.attr('attr').toTerraform()).toMatchSnapshot();
});
