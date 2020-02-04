import { Block, Argument, Attribute } from '..';

export default class Backend extends Block {

  readonly name: string;

  constructor(name: string, args: object) {
    super('backend', [name], args);

    this.name = name;
  }

  asArgument(): Argument {
    return new Argument(true, JSON.stringify(this.name));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAttribute(name: string): Attribute {
    throw new Error('Inaccessible function.');
  }

}
