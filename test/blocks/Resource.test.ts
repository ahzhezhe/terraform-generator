import { arg4 } from '..';
import { Map } from '../../src/arguments';
import { Resource } from '../../src/blocks';

test('Resource', () => {
  const resource = new Resource('type', 'name', arg4);
  expect(resource.toTerraform()).toMatchSnapshot();
  expect(resource.asArgument().toTerraform()).toMatchSnapshot();
  expect(resource.attr('attr').toTerraform()).toMatchSnapshot();
});

describe('toData', () => {

  const resource = new Resource('type', 'name', {
    arg: 'arg',
    tags: new Map({
      a: 'a',
      b: 'b'
    })
  });

  test('OK', () => {
    expect(resource.toData(undefined, ['arg', ['tags', 'tag']]).toTerraform()).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']]).toTerraform()).toMatchSnapshot();
  });

  test('Data args', () => {
    expect(resource.toData(undefined, ['arg', ['tags', 'tag']], { a: 'a' }).toTerraform()).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { a: 'a' }).toTerraform()).toMatchSnapshot();
  });

  test('Data args overwrite', () => {
    expect(resource.toData(undefined, ['arg', ['tags', 'tag']], { arg: 'a' }).toTerraform()).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { arg: 'a' }).toTerraform()).toMatchSnapshot();
  });

  test('Data args with filter', () => {
    expect(resource.toData(undefined, ['arg', ['tags', 'tag']], { filter: [] }).toTerraform()).toMatchSnapshot();
    expect(resource.toData({ type: 'newType', name: 'newName' }, ['arg', ['tags', 'tag']], { filter: [] }).toTerraform())
      .toMatchSnapshot();
  });

  test('Data args invalid filter', () => {
    expect(() => resource.toData(undefined, ['arg'], { filter: 'a' })).toThrow();
    expect(() => resource.toData(undefined, ['arg'], { filter: 'a' })).toThrow();
  });

});
