import { Heredoc, heredoc } from '../../src/arguments';

test('Heredoc', () => {
  expect(new Heredoc('x').toTerraform()).toMatchSnapshot();
  expect(new Heredoc({ x: 123 }).toTerraform()).toMatchSnapshot();
});

test('heredoc', () => {
  expect(heredoc('x').toTerraform()).toMatchSnapshot();
  expect(heredoc({ x: 123 }).toTerraform()).toMatchSnapshot();
});
