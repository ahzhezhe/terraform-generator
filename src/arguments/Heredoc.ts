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
