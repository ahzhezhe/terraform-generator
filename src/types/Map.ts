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
 * Convenient function to construct new map.
 *
 * @param args map values
 */
export const map = (args: Record<string, any>): Map => new Map(args);
