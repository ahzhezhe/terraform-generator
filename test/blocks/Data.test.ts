import { arg4 } from '..';
import { Data } from '../../src';
import { Util } from '../../src/Util';

test('Data', () => {
  const data = new Data('type', 'name', arg4);
  expect(data.toTerraform()).toMatchSnapshot();
  expect(data.asArgument().toTerraform()).toBe(Util.escape('data.type.name'));
  expect(data.attr('attr').toTerraform()).toBe(Util.escape('data.type.name.attr'));
});
