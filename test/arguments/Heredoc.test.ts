import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';
import { Heredoc, heredoc } from '../../src';

test('Heredoc', () => {
  expect(new Heredoc('x').toString()).toBe(TerraformGeneratorUtils.escape(`<<EOT
x
EOT
`));
  expect(new Heredoc({ x: 123 }).toString()).toBe(TerraformGeneratorUtils.escape(`<<EOT
{
  "x": 123
}
EOT
`));
});

test('heredoc', () => {
  expect(heredoc('x').toString()).toBe(TerraformGeneratorUtils.escape(`<<EOT
x
EOT
`));
  expect(heredoc({ x: 123 }).toString()).toBe(TerraformGeneratorUtils.escape(`<<EOT
{
  "x": 123
}
EOT
`));
});
