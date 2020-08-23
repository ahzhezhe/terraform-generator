import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Literal, literal } from '../../src';

test('Literal', () => {
  expect(new Literal('x').toTerraform()).toBe(TerraformGeneratorUtils.escape('x'));
});

test('literal', () => {
  expect(literal('x').toTerraform()).toBe(TerraformGeneratorUtils.escape('x'));
});
