import { resource } from '..';
import { Attribute, attr } from '../../src/arguments';
import { Block } from '../../src/blocks';

test('Attribute invalid args', () => {
  expect(() => new Attribute(null as unknown as Block, null as unknown as string)).toThrow();
  expect(() => new Attribute(resource, null as unknown as string)).toThrow();
  expect(() => new Attribute(null as unknown as Block, 'x')).toThrow();
  expect(() => new Attribute(null as unknown as Block, '')).toThrow();
  expect(() => new Attribute(null as unknown as Block, ' ')).toThrow();
});

test('Attribute', () => {
  expect(new Attribute(resource, 'x').toTerraform()).toMatchSnapshot();
});

test('attr', () => {
  expect(attr(resource, 'x').toTerraform()).toMatchSnapshot();
});
