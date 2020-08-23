import { Argument } from '..';

export default class Each extends Argument {

  /**
   * Construct each argument.
   * 
   * @param attrName attribute name
   */
  constructor(attrName: string) {
    super(`each.${attrName}`);
  }

}

/**
 * Convenient function to construct new each argument.
 * 
 * @param attrName attribute name
 */
export const each = (attrName: string): Each => new Each(attrName);
