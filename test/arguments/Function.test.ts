import { Function } from '../../src';
import { attr } from '..';

test('Function invalid args', () => {
  expect(() => new Function(null)).toThrow();
  expect(() => new Function('fn', null)).toThrow();
});

test('Function', () => {
  expect(new Function('fn').toTerraform()).toBe('fn()');
  expect(new Function('fn', 'x', 'y', 'z').toTerraform()).toBe('fn("x", "y", "z")');
  expect(new Function('fn', 1, 2, 3).toTerraform()).toBe('fn(1, 2, 3)');
  expect(new Function('fn', true, false, true).toTerraform()).toBe('fn(true, false, true)');
  expect(new Function('fn', 'x', 2, true).toTerraform()).toBe('fn("x", 2, true)');
  expect(new Function('fn', 'x', attr).toTerraform()).toBe('fn("x", type.name.attr)');
});
