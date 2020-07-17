import { Block, Argument, Attribute } from '..';

export default class Provisioner extends Block {

  readonly type: string;

  /**
   * Construct provisioner.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param args arguments
   * @param innerBlocks inner blocks
   */
  constructor(type: string, args?: Record<string, any>, innerBlocks?: Block[]) {
    super('provisioner', [type], args, innerBlocks);

    this.type = type;
  }

  asArgument(): Argument {
    return new Argument(JSON.stringify(this.type), true);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attr(name: string): Attribute {
    throw new Error('Inaccessible function.');
  }

}
