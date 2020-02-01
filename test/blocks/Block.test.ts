import { Resource } from '../..';
import { tfGenerator12, arg4 } from '.';

test('Block identifier', () => {
  expect(() => new Resource(tfGenerator12, '!@#', '$%^', arg4(tfGenerator12))).toThrow();
});

test('Block arguments', () => {
  const resource = new Resource(tfGenerator12, 'type', 'name', arg4(tfGenerator12));
  expect(resource.getArguments()).toMatchSnapshot();
  expect(resource.setArgument('test0', 'test0').getArguments()).toMatchSnapshot();
  expect(resource.setArguments({
    test1: 'test1',
    test2: 2,
    test3: true
  }).getArguments()).toMatchSnapshot();
  expect(resource.deleteArgument('test2').getArguments()).toMatchSnapshot();
});
