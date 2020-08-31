import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Locals } from '../../src';
import { arg4 } from '..';

test('Locals', () => {
  const locals = new Locals(arg4);
  expect(locals.toTerraform()).toMatchSnapshot();
  expect(() => locals.asArgument()).toThrow();
  expect(() => locals.attr('attr')).toThrow();
  expect(locals.arg('arg').toTerraform()).toBe(TerraformGeneratorUtils.escape('local.arg'));
});
