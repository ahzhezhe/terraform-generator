import { Variable } from '../..';
import { tfGenerator11, tfGenerator12, arg4 } from '.';

test('Variable 0.11', () => {
  const variable = new Variable(tfGenerator11, 'name', arg4(tfGenerator11));
  expect(variable.toTerraform()).toMatchSnapshot();
  expect(variable.asArgument().toTerraform()).toMatchSnapshot();
  expect(variable.getAttribute('attr').toTerraform()).toMatchSnapshot();
});

test('Variable 0.12', () => {
  const variable = new Variable(tfGenerator12, 'name', arg4(tfGenerator12));
  expect(variable.toTerraform()).toMatchSnapshot();
  expect(variable.asArgument().toTerraform()).toMatchSnapshot();
  expect(variable.getAttribute('attr').toTerraform()).toMatchSnapshot();
});
