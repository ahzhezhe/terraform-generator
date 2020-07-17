import { Block, Argument, Attribute } from '..';

export default class Output extends Block {

  readonly name: string;

  /**
   * Construct output.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param name name
   * @param args arguments
   * @param innerBlocks inner blocks
   */
  constructor(name: string, args?: Record<string, any>, innerBlocks?: Block[]) {
    super('output', [name], args, innerBlocks);

    this.name = name;
  }

  asArgument(): Argument {
    throw new Error('Inaccessible function.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attr(name: string): Attribute {
    throw new Error('Inaccessible function.');
  }

}
