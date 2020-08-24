import TerraformGeneratorUtils from '../TerraformGeneratorUtils';

export default class Argument {

  readonly argument: string | Argument;

  /**
   * Construct argument.
   * 
   * @param arg argument as string or copy from another argument object
   */
  constructor(arg: string | Argument) {
    if (!arg || (typeof arg === 'string' && !arg.trim())) {
      throw new Error('Argument cannot be empty.');
    }

    this.argument = arg;
  }

  /**
   * To Terraform representation.
   */
  toTerraform(): string {
    let str = '';
    if (this.argument instanceof Argument) {
      str += this.argument.toTerraform();
    } else {
      str += this.argument;
    }
    return TerraformGeneratorUtils.escape(str);
  }

  /**
   * To string. It is automatically called when argument is used in template literal.
   */
  toString(): string {
    return `\${${this.toTerraform()}}`;
  }

}

/**
 * Convenient function to construct new argument.
 * 
 * @param arg argument as string or copy from another argument object
 */
export const arg = (arg: string | Argument): Argument => new Argument(arg);
