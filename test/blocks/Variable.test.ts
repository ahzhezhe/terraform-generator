import { Variable } from '../..';
import { arg4 } from '.';

test('Variable', () => {
  const variable = new Variable('name', arg4);
  expect(variable.toTerraform('0.11')).toMatchSnapshot();
  expect(variable.toTerraform('0.12')).toMatchSnapshot();
  expect(variable.asArgument().toTerraform()).toMatchSnapshot();
  expect(variable.getAttribute('attr').toTerraform()).toMatchSnapshot();
});
