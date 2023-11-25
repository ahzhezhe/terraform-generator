import { TerraformArgs, Util } from '../utils';
import { Argument } from '.';

/**
 * @category Argument
 */
export class Map extends Argument {

  readonly arguments: TerraformArgs;

  /**
   * Construct map.
   *
   * @param args map values
   */
  constructor(args: TerraformArgs) {
    super(Map.#constructArgument(args));
    this.arguments = args;
  }

  static #constructArgument(args: TerraformArgs): string {
    return Util.argumentValueToString(args)!;
  }

}

/**
 * Convenient function to construct new [[Map]].
 *
 * @param args map values
 *
 * @category Argument
 */
export const map = (args: TerraformArgs): Map => new Map(args);
