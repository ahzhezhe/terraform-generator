import { arg4 } from '..';
import { Argument } from '../../src/arguments';
import { RequiredProviders, Resource } from '../../src/blocks';

const resource = new Resource('type', 'name', arg4);

test('RequiredProviders', () => {
  const requiredProviders = new RequiredProviders({
    to: resource,
    id: 'id',
    provider: new Argument('arg')
  });
  expect(requiredProviders.toTerraform()).toMatchSnapshot();
  expect(() => requiredProviders.asArgument()).toThrow();
  expect(() => requiredProviders.attr('attr')).toThrow();
});
