import { attr } from '..';
import { Argument, arg } from '../../src/arguments';

test('Argument', () => {
  expect(new Argument('x').toTerraform()).toMatchSnapshot();
});

test('arg', () => {
  expect(arg('x').toTerraform()).toMatchSnapshot();
  expect(attr.toTerraform()).toMatchSnapshot();
});

test('.attr', () => {
  expect(arg('x').attr('y').toTerraform()).toMatchSnapshot();
  expect(attr.attr('y').toTerraform()).toMatchSnapshot();
});

test('.element', () => {
  expect(arg('x').element(0).toTerraform()).toMatchSnapshot();
  expect(attr.element(0).toTerraform()).toMatchSnapshot();
});

test('interpolation', () => {
  expect(`prefix-${arg('x')}-suffix`).toMatchSnapshot();
  expect(`prefix-${attr}-suffix`).toMatchSnapshot();
});
