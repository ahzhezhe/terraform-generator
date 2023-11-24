import { arg4 } from '..';
import { Locals } from '../../src/blocks';
import { Util } from '../../src/utils';

test('Locals', () => {
  const locals = new Locals(arg4);
  expect(locals.toTerraform()).toMatchSnapshot();
  expect(() => locals.asArgument()).toThrow();
  expect(() => locals.attr('attr')).toThrow();
  expect(locals.arg('arg').toTerraform()).toBe(Util.escape('local.arg'));
});
