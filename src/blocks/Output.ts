import { Argument, Attribute } from '../arguments';
import { BlockArgs } from '../utils';
import { Block, Resource } from '.';

/**
 * @category Block
 */
export interface OutputArgs {
  value: any;
  description?: string;
  sensitive?: boolean;
  precondition?: BlockArgs;
  depends_on?: Resource[];
}

/**
 * @category Block
 */
export class Output extends Block<OutputArgs> {

  readonly name: string;

  /**
   * Construct output.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param name name
   * @param args arguments
   */
  constructor(name: string, args: OutputArgs) {
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
