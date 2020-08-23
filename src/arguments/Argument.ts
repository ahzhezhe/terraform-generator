import TerraformGeneratorUtils from '../TerraformGeneratorUtils';

export default class Argument {

  readonly argument: string | Argument;
  readonly literal: boolean;

  /**
   * Construct argument.
   * 
   * @param arg argument as string or copy from another argument object
   * @param literal argument will be printed as is, without extra symbol, quotes and whatnot, regardless of Terraform version, default = false.
   */
  constructor(arg: string | Argument, literal = false) {
    if (!arg || (typeof arg === 'string' && !arg.trim())) {
      throw new Error('Argument cannot be empty.');
    }

    this.argument = arg;
    this.literal = literal;
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
   * To string, used when argument is used in string interpolation.
   */
  toString(): string {
    return `\${${this.toTerraform()}}`;
  }

}

/**
 * Convenient function to construct new argument.
 * 
 * @param arg argument as string or copy from another argument object
 * @param literal argument will be printed as is, without extra symbol, quotes and whatnot, regardless of Terraform version, default = false.
 */
export const arg = (arg: string | Argument, literal = false): Argument => new Argument(arg, literal);
