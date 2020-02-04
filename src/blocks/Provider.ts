import { Block, Argument, Attribute } from '..';

export default class Provider extends Block {

  readonly name: string;

  constructor(name: string, args?: object) {
    super('provider', [name], args);

    this.name = name;
  }

  asArgument(): Argument {
    if (this.getArgument('alias')) {
      return new Argument(`${this.name}.${this.getArgument('alias')}`);
    }
    return new Argument(this.name);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAttribute(name: string): Attribute {
    throw new Error('Inaccessible function.');
  }

}
