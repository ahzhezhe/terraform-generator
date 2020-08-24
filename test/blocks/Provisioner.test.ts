import { Provisioner } from '../../src';
import { arg4 } from '..';

test('Provisioner', () => {
  const provisioner = new Provisioner('name', arg4);
  expect(provisioner.toTerraform()).toMatchSnapshot();
  expect(() => provisioner.asArgument()).toThrow();
  expect(() => provisioner.attr('attr')).toThrow();
});
