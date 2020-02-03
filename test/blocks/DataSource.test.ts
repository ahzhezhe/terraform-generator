import { DataSource } from '../../src';
import { arg4 } from '.';

test('DataSource', () => {
  const dataSource = new DataSource('type', 'name', arg4);
  expect(dataSource.toTerraform('0.11')).toMatchSnapshot();
  expect(dataSource.toTerraform('0.12')).toMatchSnapshot();
  expect(dataSource.asArgument().toTerraform()).toMatchSnapshot();
  expect(dataSource.getAttribute('attr').toTerraform()).toMatchSnapshot();
});
