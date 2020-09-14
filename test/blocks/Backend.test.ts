import { arg4 } from '..';
import { Backend } from '../../src';
import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';

test('Backend', () => {
  const backend = new Backend('name', arg4);
  expect(backend.toTerraform()).toMatchSnapshot();
  expect(backend.asArgument().toTerraform()).toBe(TerraformGeneratorUtils.escape('"name"'));
  expect(() => backend.attr('attr')).toThrow();
});
