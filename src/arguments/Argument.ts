export default class Argument {

  readonly argument: string | Argument;
  readonly asIs: boolean;

  /**
   * Construct argument.
   * 
   * @param arg argument as string or copy from another argument object
   * @param asIs argument will be printed as is, without extra symbol, quotes and whatnot, regardless of Terraform version, default = false.
   */
  constructor(arg: string | Argument, asIs = false) {
    if (!arg || (typeof arg === 'string' && !arg.trim())) {
      throw new Error('Argument cannot be empty.');
    }

    this.argument = typeof arg === 'string' ? arg.trim() : arg;
    this.asIs = asIs;
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
    return str;
  }

}

/**
 * Convenient function to construct new argument.
 * 
 * @param arg argument as string or copy from another argument object
 * @param asIs argument will be printed as is, without extra symbol, quotes and whatnot, regardless of Terraform version, default = false.
 */
export const arg = (arg: string | Argument, asIs = false): Argument => new Argument(arg, asIs);
