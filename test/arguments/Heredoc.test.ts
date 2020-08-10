import { Heredoc, heredoc } from '../../src';

test('Heredoc', () => {
  expect(new Heredoc('x').toTerraform()).toBe(`<<EOT
x
EOT
`);
  expect(new Heredoc({ x: 123 }).toTerraform()).toBe(`<<EOT
{
  "x": 123
}
EOT
`);
});

test('heredoc', () => {
  expect(heredoc('x').toTerraform()).toBe(`<<EOT
x
EOT
`);
  expect(heredoc({ x: 123 }).toTerraform()).toBe(`<<EOT
{
  "x": 123
}
EOT
`);
});
