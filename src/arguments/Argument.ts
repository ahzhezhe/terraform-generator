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
  toString(): string {
    let str = '';
    if (this.argument instanceof Argument) {
      str += this.argument.toString();
    } else {
      str += this.argument;
    }
    return TerraformGeneratorUtils.escape(str);
  }

  /**
   * To string template interpolation.
   * Use this function when this argument is used as an interpolation in a Terraform string or heredoc.
   */
  toInterpolation(): string {
    return `\${${this.toString()}}`;
  }

}

/**
 * Convenient function to construct new argument.
 * 
 * @param arg argument as string or copy from another argument object
 */
export const arg = (arg: string | Argument): Argument => new Argument(arg);
