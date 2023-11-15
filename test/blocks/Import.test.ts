import { arg4 } from '..';
import { Import } from '../../src/blocks';

test('Import', () => {
  const importTest = new Import(arg4);
  expect(importTest.toTerraform()).toMatchSnapshot();
  expect(() => importTest.asArgument()).toThrow();
  expect(() => importTest.attr('attr')).toThrow();
});
