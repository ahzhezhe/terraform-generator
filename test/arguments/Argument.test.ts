import { Argument, Attribute, Heredoc } from '../../src';
import { resource } from '..';

test('Argument invalid args', () => {
  expect(() => new Argument(null)).toThrow();
  expect(() => new Argument(true, 'x', false)).toThrow();
  expect(() => new Argument(true)).toThrow();
  expect(() => new Argument('x', true, 'y')).toThrow();
});

test('Argument', () => {
  expect(new Argument('x').toTerraform()).toBe('x');
  expect(new Argument('x', 'y', 'z').toTerraform()).toBe('xyz');
  expect(new Argument(true, 'x').toTerraform()).toBe('x');
  expect(new Argument(false, 'x').toTerraform()).toBe('x');
});

test('Attribute', () => {
  expect(new Attribute(resource, 'x').toTerraform()).toBe('type.name.x');
});

test('Heredoc', () => {
  expect(new Heredoc('x').toTerraform()).toBe('<<EOT\nx\nEOT');
});
