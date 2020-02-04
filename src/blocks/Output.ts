import { Block, Argument, Attribute } from '..';

export default class Output extends Block {

  readonly name: string;

  constructor(name: string, args?: object) {
    super('output', [name], args);

    this.name = name;
  }

  asArgument(): Argument {
    throw new Error('Inaccessible function.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAttribute(name: string): Attribute {
    throw new Error('Inaccessible function.');
  }

}
