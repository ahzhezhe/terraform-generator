import { Resource } from '../..';
import { tfGenerator11, tfGenerator12, arg4 } from '.';

test('Resource 0.11', () => {
  const resource = new Resource(tfGenerator11, 'type', 'name', arg4(tfGenerator11));
  expect(resource.toTerraform()).toMatchSnapshot();
  expect(resource.asArgument().toTerraform()).toMatchSnapshot();
  expect(resource.getAttribute('attr').toTerraform()).toMatchSnapshot();
});

test('Resource 0.12', () => {
  const resource = new Resource(tfGenerator12, 'type', 'name', arg4(tfGenerator12));
  expect(resource.toTerraform()).toMatchSnapshot();
  expect(resource.asArgument().toTerraform()).toMatchSnapshot();
  expect(resource.getAttribute('attr').toTerraform()).toMatchSnapshot();
});
