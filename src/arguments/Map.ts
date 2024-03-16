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
    super(Util.argumentValueToString(args)!);
    this.arguments = args;
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
