import shell from 'shelljs';
import fs from 'fs';
import path from 'path';

/**
 * @param filename Terraform filename, must ends with .tf, default = terraform.tf
 * @param format use 'terraform fmt' to format the plan, Terraform must be installed, default = false
 */
interface WritePlanOptions {
  filename?: string;
  format?: boolean
};

export default class Utils {

  /**
   * Write terraform plan to a file.
   * 
   * @param plan Terraform plan as string
   * @param dir directory
   * @param options options
   */
  static writePlan(plan: string, dir: string, options?: WritePlanOptions): void {
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
  }

}
