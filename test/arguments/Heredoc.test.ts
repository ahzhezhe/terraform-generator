import { Heredoc, heredoc } from '../../src';
import TerraformGeneratorUtils from '../../src/TerraformGeneratorUtils';

test('Heredoc', () => {
  expect(new Heredoc('x').toTerraform()).toBe(TerraformGeneratorUtils.escape(`<<EOT
x
EOT
`));
  expect(new Heredoc({ x: 123 }).toTerraform()).toBe(TerraformGeneratorUtils.escape(`<<EOT
{
  "x": 123
}
EOT
`));
});

test('heredoc', () => {
  expect(heredoc('x').toTerraform()).toBe(TerraformGeneratorUtils.escape(`<<EOT
x
EOT
`));
  expect(heredoc({ x: 123 }).toTerraform()).toBe(TerraformGeneratorUtils.escape(`<<EOT
{
  "x": 123
}
EOT
`));
});
