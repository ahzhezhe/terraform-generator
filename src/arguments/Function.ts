import { Util } from '../utils';
import { Argument } from '.';

/**
 * @category Argument
 */
export class Function extends Argument {

  /**
   * Construct function argument.
   *
   * @param name function name
   * @param args function arguments
   */
  constructor(name: string, ...args: any[]) {
    super(Function.#constructArgument(name, ...args));
  }

  static #constructArgument(fn: string, ...args: any[]): string {
    let str = `${fn}(`;
    args.forEach((arg, i) => {
      str += Util.argumentValueToString(arg);
      if (i < args.length - 1) {
        str += ', ';
      }
    });
    str += ')';
    return str;
  }

}

/**
 * Convenient function to construct new [[Function]].
 *
 * @param name function name
 * @param args function arguments
 *
 * @category Argument
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const fn = (name: string, ...args: any[]): Function => new Function(name, ...args);
