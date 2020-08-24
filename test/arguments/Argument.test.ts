import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Argument, arg, heredoc } from '../../src';
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

test('toString in arg', () => {
  expect(arg(`prefix-${arg('x')}-suffix`).toTerraform()).toBe(TerraformGeneratorUtils.escape('prefix-x-suffix'));
  expect(arg(`prefix-${arg(attr)}-suffix`).toTerraform()).toBe(TerraformGeneratorUtils.escape('prefix-type.name.attr-suffix'));
});

test('toString in string', () => {
  expect(`prefix-${arg('x')}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-x-suffix'));
  expect(`prefix-${arg(attr)}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-type.name.attr-suffix'));
});

test('toTemplate in string', () => {
  expect(`prefix-${arg('x').toTemplate()}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-${x}-suffix'));
  expect(`prefix-${arg(attr).toTemplate()}-suffix`).toBe(TerraformGeneratorUtils.escape('prefix-${type.name.attr}-suffix'));
});

test('toTemplate in heredoc', () => {
  expect(heredoc(`prefix-${arg('x').toTemplate()}-suffix`).toTerraform()).toBe(TerraformGeneratorUtils.escape(`<<EOT
prefix-\${x}-suffix
EOT
`));
  expect(heredoc(`prefix-${arg(attr).toTemplate()}-suffix`).toTerraform()).toBe(TerraformGeneratorUtils.escape(`<<EOT
prefix-\${type.name.attr}-suffix
EOT
`));
});
