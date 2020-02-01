import { Provider } from '../..';
import { tfGenerator11, tfGenerator12, arg4 } from '.';

test('Provider 0.11', () => {
  const provider = new Provider(tfGenerator11, 'name', arg4(tfGenerator11));
  expect(provider.toTerraform()).toMatchSnapshot();
  expect(provider.asArgument().toTerraform()).toMatchSnapshot();
  expect(() => provider.getAttribute('attr')).toThrow();
});

test('Provider alias 0.11', () => {
  const provider = new Provider(tfGenerator11, 'name', { ...arg4(tfGenerator11), alias: 'alias' });
  expect(provider.toTerraform()).toMatchSnapshot();
  expect(provider.asArgument().toTerraform()).toMatchSnapshot();
  expect(() => provider.getAttribute('attr')).toThrow();
});

test('Provider 0.12', () => {
  const provider = new Provider(tfGenerator12, 'name', arg4(tfGenerator12));
  expect(provider.toTerraform()).toMatchSnapshot();
  expect(provider.asArgument().toTerraform()).toMatchSnapshot();
  expect(() => provider.getAttribute('attr')).toThrow();
});

test('Provider alias 0.12', () => {
  const provider = new Provider(tfGenerator12, 'name', { ...arg4(tfGenerator12), alias: 'alias' });
  expect(provider.toTerraform()).toMatchSnapshot();
  expect(provider.asArgument().toTerraform()).toMatchSnapshot();
  expect(() => provider.getAttribute('attr')).toThrow();
});
