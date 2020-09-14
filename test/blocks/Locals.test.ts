import { arg4 } from '..';
import { Locals } from '../../src';
import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';

test('Locals', () => {
  const locals = new Locals(arg4);
  expect(locals.toTerraform()).toMatchSnapshot();
  expect(() => locals.asArgument()).toThrow();
  expect(() => locals.attr('attr')).toThrow();
  expect(locals.arg('arg').toTerraform()).toBe(TerraformGeneratorUtils.escape('local.arg'));
});
