/**
 * @category Type
 */
export class Map {

  readonly arguments: Record<string, any>;

  /**
   * Construct map.
   *
   * @param args map values
   */
  constructor(args: Record<string, any>) {
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
export const map = (args: Record<string, any>): Map => new Map(args);
