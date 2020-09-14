import { arg4 } from '..';
import { Variable } from '../../src';
import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';

test('Variable', () => {
  const variable = new Variable('name', arg4);
  expect(variable.toTerraform()).toMatchSnapshot();
  expect(variable.asArgument().toTerraform()).toBe(TerraformGeneratorUtils.escape('var.name'));
  expect(variable.attr('attr').toTerraform()).toBe(TerraformGeneratorUtils.escape('var.name.attr'));
});
