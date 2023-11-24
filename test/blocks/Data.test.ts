import { arg4 } from '..';
import { Data } from '../../src/blocks';
import { Util } from '../../src/utils';

test('Data', () => {
  const data = new Data('type', 'name', arg4);
  expect(data.toTerraform()).toMatchSnapshot();
  expect(data.asArgument().toTerraform()).toBe(Util.escape('data.type.name'));
  expect(data.attr('attr').toTerraform()).toBe(Util.escape('data.type.name.attr'));
});
