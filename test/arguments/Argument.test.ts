import { attr } from '..';
import { Argument, arg } from '../../src';
import { Util } from '../../src/Util';

test('Argument invalid args', () => {
  expect(() => new Argument(null)).toThrow();
});

test('Argument', () => {
  expect(new Argument('x').toTerraform()).toBe(Util.escape('x'));
  expect(new Argument(attr).toTerraform()).toBe(Util.escape('type.name.attr'));
});

test('arg', () => {
  expect(arg('x').toTerraform()).toBe(Util.escape('x'));
  expect(arg(attr).toTerraform()).toBe(Util.escape('type.name.attr'));
});

test('.attr', () => {
  expect(arg('x').attr('y').toTerraform()).toBe(Util.escape('x.y'));
  expect(arg(attr).attr('y').toTerraform()).toBe(Util.escape('type.name.attr.y'));
});

test('.element', () => {
  expect(arg('x').element(0).toTerraform()).toBe(Util.escape('x[0]'));
  expect(arg(attr).element(0).toTerraform()).toBe(Util.escape('type.name.attr[0]'));
});

test('interpolation', () => {
  expect(`prefix-${arg('x')}-suffix`).toBe(Util.escape('prefix-${x}-suffix'));
  expect(`prefix-${arg(attr)}-suffix`).toBe(Util.escape('prefix-${type.name.attr}-suffix'));
});
