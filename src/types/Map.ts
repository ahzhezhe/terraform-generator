import { BlockArgs } from '../utils';

/**
 * @category Type
 */
export class Map {

  readonly arguments: BlockArgs;

  /**
   * Construct map.
   *
   * @param args map values
   */
  constructor(args: BlockArgs) {
    this.arguments = args;
  }

}

/**
 * Convenient function to construct new [[Map]].
 *
 * @param args map values
 *
 * @category Type
 */
export const map = (args: BlockArgs): Map => new Map(args);
