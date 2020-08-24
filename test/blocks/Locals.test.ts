import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Locals } from '../../src';
import { arg4 } from '..';

test('Locals', () => {
  const lcoals = new Locals(arg4);
  expect(lcoals.toTerraform('0.12')).toMatchSnapshot();
  expect(() => lcoals.asArgument()).toThrow();
  expect(() => lcoals.attr('attr')).toThrow();
  expect(lcoals.arg('arg').toTerraform()).toBe(TerraformGeneratorUtils.escape('local.arg'));
});
