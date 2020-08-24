import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Data } from '../../src';
import { arg4 } from '..';

test('Data', () => {
  const data = new Data('type', 'name', arg4);
  expect(data.toString()).toMatchSnapshot();
  expect(data.asArgument().toString()).toBe(TerraformGeneratorUtils.escape('data.type.name'));
  expect(data.attr('attr').toString()).toBe(TerraformGeneratorUtils.escape('data.type.name.attr'));
});
