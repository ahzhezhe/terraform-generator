import { Resource, map } from '../../src';
import { arg4 } from '..';

test('Resource', () => {
  const resource = new Resource('type', 'name', arg4);
  expect(resource.toTerraform('0.11')).toMatchSnapshot();
  expect(resource.toTerraform('0.12')).toMatchSnapshot();
  expect(resource.asArgument().toTerraform()).toBe('type.name');
  expect(resource.getAttribute('attr').toTerraform()).toBe('type.name.attr');
});

describe('toDataSourceByTags', () => {

  const okResource = new Resource('type', 'name', {
    tags: map({
      a: 'a',
      b: 'b'
    })
  });

  test('OK', () => {
    expect(okResource.toDataSourceByTags().toTerraform('0.11')).toMatchSnapshot();
    expect(okResource.toDataSourceByTags().toTerraform('0.12')).toMatchSnapshot();
    expect(okResource.toDataSourceByTags('newName').toTerraform('0.11')).toMatchSnapshot();
    expect(okResource.toDataSourceByTags('newName').toTerraform('0.12')).toMatchSnapshot();
  });

  test('Resource no tags', () => {
    const resource = new Resource('type', 'name');
    expect(() => resource.toDataSourceByTags()).toThrow();
    expect(() => resource.toDataSourceByTags('newName')).toThrow();
  });

  test('DataSource args', () => {
    expect(okResource.toDataSourceByTags(null, { a: 'a' }).toTerraform('0.11')).toMatchSnapshot();
    expect(okResource.toDataSourceByTags(null, { a: 'a' }).toTerraform('0.12')).toMatchSnapshot();
    expect(okResource.toDataSourceByTags('newName', { a: 'a' }).toTerraform('0.11')).toMatchSnapshot();
    expect(okResource.toDataSourceByTags('newName', { a: 'a' }).toTerraform('0.12')).toMatchSnapshot();
  });

  test('DataSource args with filter', () => {
    expect(okResource.toDataSourceByTags(null, { filter: [] }).toTerraform('0.11')).toMatchSnapshot();
    expect(okResource.toDataSourceByTags(null, { filter: [] }).toTerraform('0.12')).toMatchSnapshot();
    expect(okResource.toDataSourceByTags('newName', { a: 'a' }).toTerraform('0.11')).toMatchSnapshot();
    expect(okResource.toDataSourceByTags('newName', { a: 'a' }).toTerraform('0.12')).toMatchSnapshot();
  });

  test('DataSource args invalid filter', () => {
    expect(() => okResource.toDataSourceByTags(null, { filter: 'a' })).toThrow();
    expect(() => okResource.toDataSourceByTags('newName', { filter: 'a' })).toThrow();
  });

});
