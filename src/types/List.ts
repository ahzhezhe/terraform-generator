export default class List {

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
 * Convenient function to construct new list.
 * 
 * @param elements list elements
 */
export const list = (...elements: any[]): List => new List(...elements);
