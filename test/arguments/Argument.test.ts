import { Argument, arg } from '../../src';
import { attr } from '..';

test('Argument invalid args', () => {
  expect(() => new Argument(null)).toThrow();
  expect(() => new Argument(null, true)).toThrow();
  expect(() => new Argument(null, false)).toThrow();

});

test('Argument', () => {
  expect(new Argument('x').toTerraform()).toBe('x');
  expect(new Argument('x', true).toTerraform()).toBe('x');
  expect(new Argument('x', false).toTerraform()).toBe('x');
  expect(new Argument(attr).toTerraform()).toBe('type.name.attr');
  expect(new Argument(attr, true).toTerraform()).toBe('type.name.attr');
  expect(new Argument(attr, false).toTerraform()).toBe('type.name.attr');
});

test('arg', () => {
  expect(arg('x').toTerraform()).toBe('x');
  expect(arg('x', true).toTerraform()).toBe('x');
  expect(arg('x', false).toTerraform()).toBe('x');
  expect(arg(attr).toTerraform()).toBe('type.name.attr');
  expect(arg(attr, true).toTerraform()).toBe('type.name.attr');
  expect(arg(attr, false).toTerraform()).toBe('type.name.attr');
});
