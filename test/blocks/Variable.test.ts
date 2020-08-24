import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Variable } from '../../src';
import { arg4 } from '..';

test('Variable', () => {
  const variable = new Variable('name', arg4);
  expect(variable.toTerraform()).toMatchSnapshot();
  expect(variable.asArgument().toTerraform()).toBe(TerraformGeneratorUtils.escape('var.name'));
  expect(variable.attr('attr').toTerraform()).toBe(TerraformGeneratorUtils.escape('var.name.attr'));
});
