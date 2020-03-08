import { Resource, map } from '../../src';
import { arg4 } from '..';

test('Resource', () => {
  const resource = new Resource('type', 'name', arg4);
  expect(resource.toTerraform('0.11')).toMatchSnapshot();
  expect(resource.toTerraform('0.12')).toMatchSnapshot();
  expect(resource.asArgument().toTerraform()).toBe('type.name');
  expect(resource.attr('attr').toTerraform()).toBe('type.name.attr');
});

describe('toData', () => {

  const resource = new Resource('type', 'name', {
    arg: 'arg',
    tags: map({
      a: 'a',
      b: 'b'
    })
  });

  test('OK', () => {
    expect(resource.toData(null, ['arg', ['tags', 'tag']]).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toData(null, ['arg', ['tags', 'tag']]).toTerraform('0.12')).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']]).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']]).toTerraform('0.12')).toMatchSnapshot();
  });

  test('Data args', () => {
    expect(resource.toData(null, ['arg', ['tags', 'tag']], { a: 'a' }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toData(null, ['arg', ['tags', 'tag']], { a: 'a' }).toTerraform('0.12')).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { a: 'a' }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { a: 'a' }).toTerraform('0.12')).toMatchSnapshot();
  });

  test('Data args overwrite', () => {
    expect(resource.toData(null, ['arg', ['tags', 'tag']], { arg: 'a' }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toData(null, ['arg', ['tags', 'tag']], { arg: 'a' }).toTerraform('0.12')).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { arg: 'a' }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { arg: 'a' }).toTerraform('0.12')).toMatchSnapshot();
  });

  test('Data args with filter', () => {
    expect(resource.toData(null, ['arg', ['tags', 'tag']], { filter: [] }).toTerraform('0.11')).toMatchSnapshot();
    expect(resource.toData(null, ['arg', ['tags', 'tag']], { filter: [] }).toTerraform('0.12')).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { filter: [] }).toTerraform('0.11'))
      .toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { filter: [] }).toTerraform('0.12'))
      .toMatchSnapshot();
  });

  test('Data args invalid filter', () => {
    expect(() => resource.toData(null, ['arg'], { filter: 'a' })).toThrow();
    expect(() => resource.toData(null, ['arg'], { filter: 'a' })).toThrow();
  });

});
