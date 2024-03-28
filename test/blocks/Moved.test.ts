import { arg } from '../../src/arguments';
import { Moved, Resource } from '../../src/blocks';

test('To argument', () => {
  const moved = new Moved({
    from: arg('resource.a'),
    to: arg('resource.b')
  });
  expect(moved.toTerraform()).toMatchSnapshot();
  expect(() => moved.asArgument()).toThrow();
  expect(() => moved.attr('attr')).toThrow();
});

test('To resource', () => {
  const resource = new Resource('resource', 'b');
  const moved = new Moved({
    from: arg('resource.a'),
    to: resource
  });
  expect(moved.toTerraform()).toMatchSnapshot();
  expect(() => moved.asArgument()).toThrow();
  expect(() => moved.attr('attr')).toThrow();
});
