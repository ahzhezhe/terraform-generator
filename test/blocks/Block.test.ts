import { Argument } from '../../src/arguments';
import { Resource, Provisioner, Output } from '../../src/blocks';

test('Block identifier', () => {
  expect(() => new Resource('!@#', '$%^')).toThrow();
  expect(() => new Resource('', ' ')).toThrow();
  expect(() => new Output(null as unknown as string, { value: 'value' })).toThrow();
});

test('Block arguments', () => {
  const resource = new Resource('type', 'name');
  expect(resource.getArguments()).toMatchSnapshot();
  expect(resource.setArgument('a', 1).getArguments()).toMatchSnapshot();
  expect(resource.setArguments({
    a: 0,
    b: 1,
    c: 2
  }).getArguments()).toMatchSnapshot();
  expect(resource.deleteArgument('b').getArguments()).toMatchSnapshot();
  expect(resource.setProvisioners([
    new Provisioner('local-exec', {
      command: 'cmd1'
    }),
    new Provisioner('remote-exec', {
      command: 'cmd2',
      when: new Argument('destroy'),
      on_failure: new Argument('fail')
    })
  ]).getProvisioners()).toMatchSnapshot();
  expect(resource.setProvisioners(undefined).getProvisioners()).toMatchSnapshot();
});
