import { Argument } from '..';

export default class Heredoc extends Argument {

  constructor(str: string) {
    super(true, `<<EOT\n${str}\nEOT`);
  }

}
