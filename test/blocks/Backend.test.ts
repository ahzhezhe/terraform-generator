import { arg4 } from '..';
import { Backend } from '../../src/blocks';

test('Backend', () => {
  const backend = new Backend('name', arg4);
  expect(backend.toTerraform()).toMatchSnapshot();
  expect(backend.asArgument().toTerraform()).toMatchSnapshot();
  expect(() => backend.attr('attr')).toThrow();
});
