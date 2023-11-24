import { Argument, Attribute } from '../arguments';
import { BlockArgs } from '../utils';
import { Block } from '.';

/**
 * @category Block
 */
export class Locals extends Block {

  /**
   * Construct locals.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param args arguments
   */
  constructor(args: BlockArgs) {
    super('locals', [], args);
  }

  override asArgument(): Argument {
    throw new Error('Inaccessible method.');
  }

  override attr(_name: string): Attribute {
    throw new Error('Inaccessible method.');
  }

  arg(name: string): Argument {
    return new Argument(`local.${name}`);
  }

}
