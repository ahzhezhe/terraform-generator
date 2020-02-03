import { Resource } from '../../src';
import { arg4 } from '.';

test('Resource', () => {
  const resource = new Resource('type', 'name', arg4);
  expect(resource.toTerraform('0.11')).toMatchSnapshot();
  expect(resource.toTerraform('0.12')).toMatchSnapshot();
  expect(resource.asArgument().toTerraform()).toMatchSnapshot();
  expect(resource.getAttribute('attr').toTerraform()).toMatchSnapshot();
});
