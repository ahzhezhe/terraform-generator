import { Argument, Attribute } from '../arguments';
import { Block } from '.';

/**
 * @category Block
 */
export class Output extends Block {

  readonly name: string;

  /**
   * Construct output.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param name name
   * @param args arguments
   */
  constructor(name: string, args?: Record<string, any>) {
    super('output', [name], args);

    this.name = name;
  }

  override asArgument(): Argument {
    throw new Error('Inaccessible method.');
  }

  override attr(_name: string): Attribute {
    throw new Error('Inaccessible method.');
  }

}
