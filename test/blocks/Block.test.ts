import { Resource } from '../..';

test('Block identifier', () => {
  expect(() => new Resource('!@#', '$%^', {})).toThrow();
});

test('Block arguments', () => {
  const resource = new Resource('type', 'name', { a: 1 });
  expect(resource.getArguments()).toMatchSnapshot();
  expect(resource.setArgument('b', 2).getArguments()).toMatchSnapshot();
  expect(resource.setArguments({
    a: 0,
    b: 1,
    c: 2
  }).getArguments()).toMatchSnapshot();
  expect(resource.deleteArgument('b').getArguments()).toMatchSnapshot();
});
