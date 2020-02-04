export default class Map {

  readonly args: object;

  /**
   * Construct map.
   * 
   * @param args map values
   */
  constructor(args: object) {
    this.args = args;
  }

}

/**
 * Convenient function to construct new map.
 * 
 * @param args map values
 */
export const map = (args: object): Map => new Map(args);
