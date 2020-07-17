import { Block, Argument, Attribute } from '..';

export default class Provider extends Block {

  readonly type: string;

  /**
   * Construct provider.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param args arguments
   * @param innerBlocks inner blocks
   */
  constructor(type: string, args?: Record<string, any>, innerBlocks?: Block[]) {
    super('provider', [type], args, innerBlocks);

    this.type = type;
  }

  asArgument(): Argument {
    if (this.getArgument('alias')) {
      return new Argument(`${this.type}.${this.getArgument('alias')}`);
    }
    return new Argument(this.type);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attr(name: string): Attribute {
    throw new Error('Inaccessible function.');
  }

}
