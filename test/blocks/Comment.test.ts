import { Comment } from '../../src/blocks';

test('Comment', () => {
  const comment = new Comment('line1');
  expect(comment.toTerraform()).toMatchSnapshot();
  expect(() => comment.asArgument()).toThrow();
  expect(() => comment.attr('attr')).toThrow();
});

test('Comment multiline', () => {
  const comment = new Comment(`
    line1
    line2

    line3
    line4
  `);
  expect(comment.toTerraform()).toMatchSnapshot();
  expect(() => comment.asArgument()).toThrow();
  expect(() => comment.attr('attr')).toThrow();
});
