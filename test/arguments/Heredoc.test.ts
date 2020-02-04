import { Heredoc, heredoc } from '../../src';

test('Heredoc', () => {
  expect(new Heredoc('x').toTerraform()).toBe('<<EOT\nx\nEOT');
});

test('heredoc', () => {
  expect(heredoc('x').toTerraform()).toBe('<<EOT\nx\nEOT');
});
