import { TerraformElement, Util } from '../utils';

/**
 * @category Argument
 */
export class Argument<T extends string = string> extends TerraformElement {

  readonly #argument: T;

  /**
   * Construct argument.
   *
   * @param arg argument as string or copy from another argument object
   * @param escape escape the value
   */
  constructor(arg: T) {
    super();

    if (!arg || (typeof arg === 'string' && !arg.trim())) {
      throw new Error('Argument cannot be undefined.');
    }

    this.#argument = arg;
  }

  /**
   * Get argument's attribute.
   *
   * @param name attribute name
   */
  attr(name: string): Argument {
    return new Argument(`${this.#argument}.${name.trim()}`);
  }

  /**
   * Get list argument's element.
   *
   * @param idx element index
   */
  element(idx: number): Argument {
    return new Argument(`${this.#argument}[${idx}]`);
  }

  /**
   * To Terraform representation.
   *
   * Use this method when argument is used as an interpolation in another Terraform argument or code.
   */
  override toTerraform(): string {
    return Util.escape(this.#argument);
  }

  /**
   * To string.
   *
   * Use this method when argument is used as an interpolation in a Terraform string or heredoc.
   *
   * It is automatically called when argument is used in template literal.
   */
  toString(): string {
    return `\${${this.toTerraform()}}`;
  }

}

/**
 * Convenient function to construct new [[Argument]].
 *
 * @param arg argument as string or copy from another argument object
 *
 * @category Argument
 */
export const arg = <T extends string = string>(arg: T): Argument<T> => new Argument(arg);
