import { Argument } from '..';

export default class Heredoc extends Argument {

  constructor(str: string) {
    super(`<<EOT\n${str}\nEOT`, true);
  }

}
