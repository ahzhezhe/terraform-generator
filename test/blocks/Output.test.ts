import { Output } from '../../src';
import { arg4 } from '..';

test('Output', () => {
  const output = new Output('name', arg4);
  expect(output.toString()).toMatchSnapshot();
  expect(() => output.asArgument()).toThrow();
  expect(() => output.attr('attr')).toThrow();
});
