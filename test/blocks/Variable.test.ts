import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Variable } from '../../src';
import { arg4 } from '..';

test('Variable', () => {
  const variable = new Variable('name', arg4);
  expect(variable.toString()).toMatchSnapshot();
  expect(variable.asArgument().toString()).toBe(TerraformGeneratorUtils.escape('var.name'));
  expect(variable.attr('attr').toString()).toBe(TerraformGeneratorUtils.escape('var.name.attr'));
});
