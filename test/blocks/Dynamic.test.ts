import { arg4 } from '..';
import { Dynamic } from '../../src/blocks';

test('Dynamic', () => {
  const dynamic = new Dynamic('name', arg4);
  expect(dynamic.toTerraform()).toMatchSnapshot();
  expect(() => dynamic.asArgument()).toThrow();
  expect(() => dynamic.attr('attr')).toThrow();
  expect(() => dynamic.arg('arg')).toThrow();
});
