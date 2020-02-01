import { DataSource } from '../..';
import { tfGenerator11, tfGenerator12, arg4 } from '.';

test('DataSource 0.11', () => {
  const dataSource = new DataSource(tfGenerator11, 'type', 'name', arg4(tfGenerator11));
  expect(dataSource.toTerraform()).toMatchSnapshot();
  expect(dataSource.getIdentifier().toTerraform()).toMatchSnapshot();
  expect(dataSource.getAttribute('attr').toTerraform()).toMatchSnapshot();
});

test('DataSource 0.12', () => {
  const dataSource = new DataSource(tfGenerator12, 'type', 'name', arg4(tfGenerator12));
  expect(dataSource.toTerraform()).toMatchSnapshot();
  expect(dataSource.getIdentifier().toTerraform()).toMatchSnapshot();
  expect(dataSource.getAttribute('attr').toTerraform()).toMatchSnapshot();
});
