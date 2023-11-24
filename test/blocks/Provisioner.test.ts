import { Argument } from '../../src/arguments';
import { Provisioner } from '../../src/blocks';

test('Provisioner', () => {
  const provisioner = new Provisioner('local-exec', {
    command: 'cmd',
    when: new Argument('destroy'),
    on_failure: new Argument('fail')
  });
  expect(provisioner.toTerraform()).toMatchSnapshot();
  expect(() => provisioner.asArgument()).toThrow();
  expect(() => provisioner.attr('attr')).toThrow();
});
