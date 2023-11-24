import { arg4 } from '..';
import { Backend } from '../../src/blocks';
import { Util } from '../../src/utils';

test('Backend', () => {
  const backend = new Backend('name', arg4);
  expect(backend.toTerraform()).toMatchSnapshot();
  expect(backend.asArgument().toTerraform()).toBe(Util.escape('"name"'));
  expect(() => backend.attr('attr')).toThrow();
});
