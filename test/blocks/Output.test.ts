import { Output } from '../../src/blocks';

test('Output', () => {
  const output = new Output('name', { value: 'value' });
  expect(output.toTerraform()).toMatchSnapshot();
  expect(() => output.asArgument()).toThrow();
  expect(() => output.attr('attr')).toThrow();
});
