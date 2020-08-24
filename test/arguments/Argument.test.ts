import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Argument, arg } from '../../src';
import { attr } from '..';

test('Argument invalid args', () => {
  expect(() => new Argument(null)).toThrow();

});

test('Argument', () => {
  expect(new Argument('x').toTerraform()).toBe(TerraformGeneratorUtils.escape('x'));
  expect(new Argument(attr).toTerraform()).toBe(TerraformGeneratorUtils.escape('type.name.attr'));
});

test('arg', () => {
  expect(arg('x').toTerraform()).toBe(TerraformGeneratorUtils.escape('x'));
  expect(arg(attr).toTerraform()).toBe(TerraformGeneratorUtils.escape('type.name.attr'));
});

test('interpolation', () => {
  expect(`prefix-${arg('x')}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-${x}-suffix'));
  expect(`prefix-${arg(attr)}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-${type.name.attr}-suffix'));
});
