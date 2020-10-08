import { arg4 } from '..';
import { Provider } from '../../src';
import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';

test('Provider', () => {
  const provider = new Provider('name', arg4);
  expect(provider.toTerraform()).toMatchSnapshot();
  expect(() => provider.asArgument()).toThrow();
  expect(() => provider.attr('attr')).toThrow();
});

test('Provider alias', () => {
  const provider = new Provider('name', { ...arg4, alias: 'alias' });
  expect(provider.toTerraform()).toMatchSnapshot();
  expect(provider.asArgument().toTerraform()).toBe(TerraformGeneratorUtils.escape('name.alias'));
  expect(() => provider.attr('attr')).toThrow();
});
