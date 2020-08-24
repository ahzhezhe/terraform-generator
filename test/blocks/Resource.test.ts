import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Resource, map } from '../../src';
import { arg4 } from '..';

test('Resource', () => {
  const resource = new Resource('type', 'name', arg4);
  expect(resource.toString()).toMatchSnapshot();
  expect(resource.asArgument().toString()).toBe(TerraformGeneratorUtils.escape('type.name'));
  expect(resource.attr('attr').toString()).toBe(TerraformGeneratorUtils.escape('type.name.attr'));
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
    expect(resource.toData(null, ['arg', ['tags', 'tag']]).toString()).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']]).toString()).toMatchSnapshot();
  });

  test('Data args', () => {
    expect(resource.toData(null, ['arg', ['tags', 'tag']], { a: 'a' }).toString()).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { a: 'a' }).toString()).toMatchSnapshot();
  });

  test('Data args overwrite', () => {
    expect(resource.toData(null, ['arg', ['tags', 'tag']], { arg: 'a' }).toString()).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { arg: 'a' }).toString()).toMatchSnapshot();
  });

  test('Data args with filter', () => {
    expect(resource.toData(null, ['arg', ['tags', 'tag']], { filter: [] }).toString()).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { filter: [] }).toString())
      .toMatchSnapshot();
  });

  test('Data args invalid filter', () => {
    expect(() => resource.toData(null, ['arg'], { filter: 'a' })).toThrow();
    expect(() => resource.toData(null, ['arg'], { filter: 'a' })).toThrow();
  });

});
