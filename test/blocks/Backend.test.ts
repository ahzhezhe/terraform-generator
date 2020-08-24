import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Backend } from '../../src';
import { arg4 } from '..';

test('Backend', () => {
  const backend = new Backend('name', arg4);
  expect(backend.toString()).toMatchSnapshot();
  expect(backend.asArgument().toString()).toBe(TerraformGeneratorUtils.escape('"name"'));
  expect(() => backend.attr('attr')).toThrow();
});
