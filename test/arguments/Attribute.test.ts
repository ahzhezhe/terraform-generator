import { Attribute } from '../../src';
import { resource } from '..';

test('Attribute', () => {
  expect(new Attribute(resource, 'x').toTerraform()).toBe('type.name.x');
});
