import { Attribute } from '../../src';
import { resource } from '..';

test('Attribute invalid args', () => {
  expect(() => new Attribute(null, null)).toThrow();
  expect(() => new Attribute(resource, null)).toThrow();
  expect(() => new Attribute(null, 'x')).toThrow();
  expect(() => new Attribute(null, '')).toThrow();
  expect(() => new Attribute(null, ' ')).toThrow();
});

test('Attribute', () => {
  expect(new Attribute(resource, 'x').toTerraform()).toBe('type.name.x');
});
