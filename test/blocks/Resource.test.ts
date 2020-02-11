import { Resource, map } from '../../src';
import { arg4 } from '..';

test('Resource', () => {
  const resource = new Resource('type', 'name', arg4);
  expect(resource.toTerraform('0.11')).toMatchSnapshot();
  expect(resource.toTerraform('0.12')).toMatchSnapshot();
  expect(resource.asArgument().toTerraform()).toBe('type.name');
  expect(resource.getAttribute('attr').toTerraform()).toBe('type.name.attr');
});

test('toDataSourceByTags', () => {
  const resource = new Resource('type', 'name', {
    tags: map({
      a: 'a',
      b: 'b'
    })
  });
  expect(resource.toDataSourceByTags().toTerraform('0.11')).toMatchSnapshot();
  expect(resource.toDataSourceByTags().toTerraform('0.12')).toMatchSnapshot();
  expect(resource.toDataSourceByTags('newName').toTerraform('0.11')).toMatchSnapshot();
  expect(resource.toDataSourceByTags('newName').toTerraform('0.12')).toMatchSnapshot();
});

test('toDataSourceByTags no tags', () => {
  const resource = new Resource('type', 'name');
  expect(() => resource.toDataSourceByTags()).toThrow();
  expect(() => resource.toDataSourceByTags('newName')).toThrow();
});

test('toDataSourceByTags tags not map', () => {
  const resource = new Resource('type', 'name', {
    tags: 'tags'
  });
  expect(() => resource.toDataSourceByTags()).toThrow();
  expect(() => resource.toDataSourceByTags('newName')).toThrow();
});
