import { Argument } from '../../src/arguments';
import { Variable } from '../../src/blocks';

test('Variable', () => {
  const variable = new Variable('name', {
    type: new Argument('string'),
    default: 'value'
  });
  expect(variable.toTerraform()).toMatchSnapshot();
  expect(variable.asArgument().toTerraform()).toMatchSnapshot();
  expect(variable.attr('attr').toTerraform()).toMatchSnapshot();
});
