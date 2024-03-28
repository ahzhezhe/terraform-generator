import { arg } from '../../src/arguments';
import { Removed } from '../../src/blocks';

test('Removed', () => {
  const moved = new Removed({
    from: arg('resource.a'),
    lifecycle: {
      destroy: false
    }
  });
  expect(moved.toTerraform()).toMatchSnapshot();
  expect(() => moved.asArgument()).toThrow();
  expect(() => moved.attr('attr')).toThrow();
});
