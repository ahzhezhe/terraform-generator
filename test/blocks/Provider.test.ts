import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Provider } from '../../src';
import { arg4 } from '..';

test('Provider', () => {
  const provider = new Provider('name', arg4);
  expect(provider.toTerraform('0.12')).toMatchSnapshot();
  expect(provider.asArgument().toTerraform()).toBe(TerraformGeneratorUtils.escape('name'));
  expect(() => provider.attr('attr')).toThrow();
});

test('Provider alias', () => {
  const provider = new Provider('name', { ...arg4, alias: 'alias' });
  expect(provider.toTerraform('0.12')).toMatchSnapshot();
  expect(provider.asArgument().toTerraform()).toBe(TerraformGeneratorUtils.escape('name.alias'));
  expect(() => provider.attr('attr')).toThrow();
});
