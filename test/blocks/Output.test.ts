import { Output } from '../..';
import { arg4 } from '.';

test('Output', () => {
  const output = new Output('name', arg4);
  expect(output.toTerraform('0.11')).toMatchSnapshot();
  expect(output.toTerraform('0.12')).toMatchSnapshot();
  expect(() => output.asArgument()).toThrow();
  expect(() => output.getAttribute('attr')).toThrow();
});
