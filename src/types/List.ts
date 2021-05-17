/**
 * @category Type
 */
export class List {

  readonly elements: any[];

  /**
   * Construct list.
   *
   * @param elements list elements
   */
  constructor(...elements: any[]) {
    this.elements = elements;
  }

}

/**
 * Convenient function to construct new [[List]].
 *
 * @param elements list elements
 *
 * @category Type
 */
export const list = (...elements: any[]): List => new List(...elements);
