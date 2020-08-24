import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Provider } from '../../src';
import { arg4 } from '..';

test('Provider', () => {
  const provider = new Provider('name', arg4);
  expect(provider.toString()).toMatchSnapshot();
  expect(provider.asArgument().toString()).toBe(TerraformGeneratorUtils.escape('name'));
  expect(() => provider.attr('attr')).toThrow();
});

test('Provider alias', () => {
  const provider = new Provider('name', { ...arg4, alias: 'alias' });
  expect(provider.toString()).toMatchSnapshot();
  expect(provider.asArgument().toString()).toBe(TerraformGeneratorUtils.escape('name.alias'));
  expect(() => provider.attr('attr')).toThrow();
});
