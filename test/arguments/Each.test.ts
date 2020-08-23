import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Each, each } from '../../src';

test('Each', () => {
  expect(new Each('x').toTerraform()).toBe(TerraformGeneratorUtils.escape('each.x'));
});

test('each', () => {
  expect(each('x').toTerraform()).toBe(TerraformGeneratorUtils.escape('each.x'));
});
