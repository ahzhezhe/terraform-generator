import TerraformGenerator, { Block, Argument, Attribute } from '../..';

export default class Provider extends Block {

  readonly name: string;

  constructor(tfGenerator: TerraformGenerator, name: string, args: object) {
    super(tfGenerator, 'provider', [name], args);

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
