import { Argument, Attribute } from '../arguments';
import { Block } from '.';

/**
 * @category Block
 */
export class Import extends Block {

  /**
   * Construct import.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param args arguments
   */
  constructor(args?: Record<string, any>) {
    super('import', [], args);
  }

  override asArgument(): Argument {
    throw new Error('Inaccessible method.');
  }

  override attr(_name: string): Attribute {
    throw new Error('Inaccessible method.');
  }

}
