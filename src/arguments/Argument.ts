import { Util } from '../Util';

export class Argument {

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
   * Get argument's attribute.
   *
   * @param name attribute name
   */
  attr(name: string): Argument {
    name = name.trim();
    if (this.argument instanceof Argument) {
      return this.argument.attr(name);
    }
    return new Argument(`${this.argument}.${name}`);
  }

  /**
   * Get list argument's element.
   *
   * @param idx element index
   */
  element(idx: number): Argument {
    if (this.argument instanceof Argument) {
      return this.argument.element(idx);
    }
    return new Argument(`${this.argument}[${idx}]`);
  }

  /**
   * To Terraform representation.
   * Use this function when argument is used as an interpolation in another Terraform argument or code.
   */
  toTerraform(): string {
    let str = '';
    if (this.argument instanceof Argument) {
      str += this.argument.toTerraform();
    } else {
      str += this.argument;
    }
    return Util.escape(str);
  }

  /**
   * To string.
   * Use this function when argument is used as an interpolation in a Terraform string or heredoc.
   * It is automatically called when argument is used in template literal.
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
