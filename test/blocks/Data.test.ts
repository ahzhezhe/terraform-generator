import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Data } from '../../src';
import { arg4 } from '..';

test('Data', () => {
  const data = new Data('type', 'name', arg4);
  expect(data.toTerraform('0.11')).toMatchSnapshot();
  expect(data.toTerraform('0.12')).toMatchSnapshot();
  expect(data.asArgument().toTerraform()).toBe(TerraformGeneratorUtils.escape('data.type.name'));
  expect(data.attr('attr').toTerraform()).toBe(TerraformGeneratorUtils.escape('data.type.name.attr'));
});
