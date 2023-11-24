import { arg4 } from '..';
import { Argument } from '../../src/arguments';
import { Import, Resource } from '../../src/blocks';

const resource = new Resource('type', 'name', arg4);

test('Import', () => {
  const imp = new Import({
    to: resource,
    id: 'id',
    provider: new Argument('arg')
  });
  expect(imp.toTerraform()).toMatchSnapshot();
  expect(() => imp.asArgument()).toThrow();
  expect(() => imp.attr('attr')).toThrow();
});
