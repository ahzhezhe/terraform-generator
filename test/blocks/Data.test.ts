import { arg4 } from '..';
import { Data } from '../../src';
import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';

test('Data', () => {
  const data = new Data('type', 'name', arg4);
  expect(data.toTerraform()).toMatchSnapshot();
  expect(data.asArgument().toTerraform()).toBe(TerraformGeneratorUtils.escape('data.type.name'));
  expect(data.attr('attr').toTerraform()).toBe(TerraformGeneratorUtils.escape('data.type.name.attr'));
});
