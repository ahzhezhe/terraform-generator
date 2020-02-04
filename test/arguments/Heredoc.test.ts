import { Heredoc } from '../../src';

test('Heredoc', () => {
  expect(new Heredoc('x').toTerraform()).toBe('<<EOT\nx\nEOT');
});
