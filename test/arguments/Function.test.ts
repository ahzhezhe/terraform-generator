import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Function, fn } from '../../src';
import { attr } from '..';

test('Function invalid args', () => {
  expect(() => new Function(null)).toThrow();
  expect(() => new Function('fn', null)).toThrow();
});

test('Function', () => {
  expect(new Function('fn').toString()).toBe(TerraformGeneratorUtils.escape('fn()'));
  expect(new Function('fn', 'x', 'y', 'z').toString()).toBe(TerraformGeneratorUtils.escape('fn("x", "y", "z")'));
  expect(new Function('fn', 1, 2, 3).toString()).toBe(TerraformGeneratorUtils.escape('fn(1, 2, 3)'));
  expect(new Function('fn', true, false, true).toString()).toBe(TerraformGeneratorUtils.escape('fn(true, false, true)'));
  expect(new Function('fn', 'x', 2, true).toString()).toBe(TerraformGeneratorUtils.escape('fn("x", 2, true)'));
  expect(new Function('fn', 'x', attr).toString()).toBe(TerraformGeneratorUtils.escape('fn("x", type.name.attr)'));
  expect(new Function('fn', 'x', { a: 1, b: '2' }).toString()).toBe(TerraformGeneratorUtils.escape('fn("x", {\na = 1\nb = "2"\n})'));
});

test('fn', () => {
  expect(fn('fn').toString()).toBe(TerraformGeneratorUtils.escape('fn()'));
  expect(fn('fn', 'x', 'y', 'z').toString()).toBe(TerraformGeneratorUtils.escape('fn("x", "y", "z")'));
  expect(fn('fn', 1, 2, 3).toString()).toBe(TerraformGeneratorUtils.escape('fn(1, 2, 3)'));
  expect(fn('fn', true, false, true).toString()).toBe(TerraformGeneratorUtils.escape('fn(true, false, true)'));
  expect(fn('fn', 'x', 2, true).toString()).toBe(TerraformGeneratorUtils.escape('fn("x", 2, true)'));
  expect(fn('fn', 'x', attr).toString()).toBe(TerraformGeneratorUtils.escape('fn("x", type.name.attr)'));
  expect(fn('fn', 'x', { a: 1, b: '2' }).toString()).toBe(TerraformGeneratorUtils.escape('fn("x", {\na = 1\nb = "2"\n})'));
});
