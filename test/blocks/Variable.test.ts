import { Variable } from '../../src';
import { arg4 } from '..';

test('Variable', () => {
  const variable = new Variable('name', arg4);
  expect(variable.toTerraform('0.11')).toMatchSnapshot();
  expect(variable.toTerraform('0.12')).toMatchSnapshot();
  expect(variable.asArgument().toTerraform()).toBe('var.name');
  expect(variable.attr('attr').toTerraform()).toBe('var.name.attr');
});
