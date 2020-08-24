import { Output } from '../../src';
import { arg4 } from '..';

test('Output', () => {
  const output = new Output('name', arg4);
  expect(output.toTerraform('0.12')).toMatchSnapshot();
  expect(() => output.asArgument()).toThrow();
  expect(() => output.attr('attr')).toThrow();
});
