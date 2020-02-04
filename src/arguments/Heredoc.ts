import { Argument } from '..';

export default class Heredoc extends Argument {

  /**
   * Construct heredoc argument.
   * 
   * @param str string
   */
  constructor(str: string) {
    super(`<<EOT\n${str}\nEOT`, true);
  }

}

/**
 * Convenient function to construct new heredoc.
 * 
 * @param str string
 */
export const heredoc = (str: string): Heredoc => new Heredoc(str);
