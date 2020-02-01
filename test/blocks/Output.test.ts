import { Output } from '../..';
import { tfGenerator11, tfGenerator12, arg4 } from '.';

test('Output 0.11', () => {
  const output = new Output(tfGenerator11, 'name', arg4(tfGenerator11));
  expect(output.toTerraform()).toMatchSnapshot();
  expect(() => output.asArgument()).toThrow();
  expect(() => output.getAttribute('attr')).toThrow();
});

test('Output 0.12', () => {
  const output = new Output(tfGenerator12, 'name', arg4(tfGenerator12));
  expect(output.toTerraform()).toMatchSnapshot();
  expect(() => output.asArgument()).toThrow();
  expect(() => output.getAttribute('attr')).toThrow();
});
