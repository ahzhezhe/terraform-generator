import { Heredoc, heredoc } from '../../src';
import { Util } from '../../src/Util';

test('Heredoc', () => {
  expect(new Heredoc('x').toTerraform()).toBe(Util.escape(`<<EOT
x
EOT
`));
  expect(new Heredoc({ x: 123 }).toTerraform()).toBe(Util.escape(`<<EOT
{
  "x": 123
}
EOT
`));
});

test('heredoc', () => {
  expect(heredoc('x').toTerraform()).toBe(Util.escape(`<<EOT
x
EOT
`));
  expect(heredoc({ x: 123 }).toTerraform()).toBe(Util.escape(`<<EOT
{
  "x": 123
}
EOT
`));
});
