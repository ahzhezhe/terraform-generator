import { arg4 } from '..';
import { Import } from '../../src/blocks';

test('Import', () => {
  const imp = new Import(arg4);
  expect(imp.toTerraform()).toMatchSnapshot();
  expect(() => imp.asArgument()).toThrow();
  expect(() => imp.attr('attr')).toThrow();
});
