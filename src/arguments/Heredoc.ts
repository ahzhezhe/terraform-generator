import { Argument } from '..';

export default class Heredoc extends Argument {

  /**
   * Construct heredoc argument.
   *
   * @param content string or object, object will be stringify
   */
  constructor(content: string | Record<any, any>) {
    super(`<<EOT\n${typeof content === 'string' ? content : JSON.stringify(content, null, 2)}\nEOT\n`);
  }

}

/**
 * Convenient function to construct new heredoc.
 *
 * @param content string or object, object will be stringify
 */
export const heredoc = (content: string | Record<any, any>): Heredoc => new Heredoc(content);
