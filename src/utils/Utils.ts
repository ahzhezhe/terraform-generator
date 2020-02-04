import shell from 'shelljs';
import fs from 'fs';
import path from 'path';

export const writePlan = (plan: string, dir: string, options?: { filename?: string; format?: boolean }): void => {
  if (!options) {
    options = {};
  }
  if (!options.filename) {
    options.filename = 'terraform.tf';
  }
  if (!options.filename.endsWith('.tf')) {
    options.filename += '.tf';
  }

  if (!fs.existsSync(dir)) {
    shell.mkdir('-p', dir);
  }
  fs.writeFileSync(path.join(dir, options.filename), plan);

  if (options.format) {
    shell.exec(`cd ${dir} && terraform fmt`);
  }
};
