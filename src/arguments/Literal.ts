import { Argument } from '..';

export default class Literal extends Argument {

  /**
   * Construct literal argument.
   * 
   * @param literal literal string
   */
  constructor(literal: string) {
    super(literal, true);
  }

}

/**
 * Convenient function to construct new literal argument.
 * 
 * @param literal literal string
 */
export const literal = (literal: string): Literal => new Literal(literal);
