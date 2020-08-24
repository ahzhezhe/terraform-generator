import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Argument, arg } from '../../src';
import { attr } from '..';

test('Argument invalid args', () => {
  expect(() => new Argument(null)).toThrow();
});

test('Argument', () => {
  expect(new Argument('x').toString()).toBe(TerraformGeneratorUtils.escape('x'));
  expect(new Argument(attr).toString()).toBe(TerraformGeneratorUtils.escape('type.name.attr'));
});

test('arg', () => {
  expect(arg('x').toString()).toBe(TerraformGeneratorUtils.escape('x'));
  expect(arg(attr).toString()).toBe(TerraformGeneratorUtils.escape('type.name.attr'));
});

test('Interpolation', () => {
  expect(`prefix-${arg('x')}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-x-suffix'));
  expect(`prefix-${arg(attr)}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-type.name.attr-suffix'));
});

test('Interpolation toInterpolation', () => {
  expect(`prefix-${arg('x').toInterpolation()}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-${x}-suffix'));
  expect(`prefix-${arg(attr).toInterpolation()}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-${type.name.attr}-suffix'));
});
