import { Argument } from '../../src/arguments';
import { Variable } from '../../src/blocks';
import { Util } from '../../src/utils';

test('Variable', () => {
  const variable = new Variable('name', {
    type: new Argument('string'),
    default: 'value'
  });
  expect(variable.toTerraform()).toMatchSnapshot();
  expect(variable.asArgument().toTerraform()).toBe(Util.escape('var.name'));
  expect(variable.attr('attr').toTerraform()).toBe(Util.escape('var.name.attr'));
});
