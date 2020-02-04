export default class Argument {

  readonly argument: string | Argument;
  readonly asIs: boolean;

  /**
   * Construct argument.
   * 
   * @param argument argument as string
   * @param asIs argument will be printed as is, without extra symbol, quotes and whatnot, regardless of Terraform version, default = false.
   */
  constructor(argument: string | Argument, asIs = false) {
    if (!argument || (typeof argument === 'string' && !argument.trim())) {
      throw new Error('Argument cannot be empty.');
    }

    this.argument = typeof argument === 'string' ? argument.trim() : argument;
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
