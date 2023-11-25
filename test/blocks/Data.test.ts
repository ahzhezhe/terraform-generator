import { arg4 } from '..';
import { Data } from '../../src/blocks';

test('Data', () => {
  const data = new Data('type', 'name', arg4);
  expect(data.toTerraform()).toMatchSnapshot();
  expect(data.asArgument().toTerraform()).toMatchSnapshot();
  expect(data.attr('attr').toTerraform()).toMatchSnapshot();
});
