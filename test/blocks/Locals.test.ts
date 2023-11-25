import { arg4 } from '..';
import { Locals } from '../../src/blocks';

test('Locals', () => {
  const locals = new Locals(arg4);
  expect(locals.toTerraform()).toMatchSnapshot();
  expect(() => locals.asArgument()).toThrow();
  expect(() => locals.attr('attr')).toThrow();
  expect(locals.arg('arg').toTerraform()).toMatchSnapshot();
});
