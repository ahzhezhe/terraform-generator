import { Block, Argument, Attribute } from '..';

export default class Backend extends Block {

  readonly type: string;

  constructor(type: string, args: object) {
    super('backend', [type], args);

    this.type = type;
  }

  asArgument(): Argument {
    return new Argument(true, JSON.stringify(this.type));
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAttribute(name: string): Attribute {
    throw new Error('Inaccessible function.');
  }

}
