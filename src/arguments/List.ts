import { Util } from '../utils';
import { Argument } from '.';

/**
 * @category Argument
 */
export class List extends Argument {

  /**
   * Construct list.
   *
   * @param elements list elements
   */
  constructor(...elements: any[]) {
    super(List.#constructArgument(elements));
  }

  static #constructArgument(elements: any[]): string {
    let str = '[\n';
    elements.forEach((element, i) => {
      str += `${Util.argumentValueToString(element)}${i < elements.length - 1 ? ',' : ''}\n`;
    });
    str += ']';
    return str;
  }

}

/**
 * Convenient function to construct new [[List]].
 *
 * @param elements list elements
 *
 * @category Argument
 */
export const list = (...elements: any[]): List => new List(...elements);
