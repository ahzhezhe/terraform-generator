import { arg4 } from '..';
import { Output } from '../../src';

test('Output', () => {
  const output = new Output('name', arg4);
  expect(output.toTerraform()).toMatchSnapshot();
  expect(() => output.asArgument()).toThrow();
  expect(() => output.attr('attr')).toThrow();
});
