import { arg4 } from '..';
import { Variable } from '../../src';
import { Util } from '../../src/Util';

test('Variable', () => {
  const variable = new Variable('name', arg4);
  expect(variable.toTerraform()).toMatchSnapshot();
  expect(variable.asArgument().toTerraform()).toBe(Util.escape('var.name'));
  expect(variable.attr('attr').toTerraform()).toBe(Util.escape('var.name.attr'));
});
