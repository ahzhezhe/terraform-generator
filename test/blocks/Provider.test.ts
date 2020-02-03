import { Provider } from '../../src';
import { arg4 } from '.';

test('Provider', () => {
  const provider = new Provider('name', arg4);
  expect(provider.toTerraform('0.11')).toMatchSnapshot();
  expect(provider.toTerraform('0.12')).toMatchSnapshot();
  expect(provider.asArgument().toTerraform()).toMatchSnapshot();
  expect(() => provider.getAttribute('attr')).toThrow();
});

test('Provider alias', () => {
  const provider = new Provider('name', { ...arg4, alias: 'alias' });
  expect(provider.toTerraform('0.11')).toMatchSnapshot();
  expect(provider.toTerraform('0.12')).toMatchSnapshot();
  expect(provider.asArgument().toTerraform()).toMatchSnapshot();
  expect(() => provider.getAttribute('attr')).toThrow();
});
