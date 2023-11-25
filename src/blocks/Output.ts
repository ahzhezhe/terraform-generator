import { Argument, Attribute } from '../arguments';
import { TerraformArgs, Util } from '../utils';
import { Block, Resource } from '.';

/**
 * @category Block
 */
export interface OutputArgs {
  value: any;
  description?: string;
  sensitive?: boolean;
  precondition?: TerraformArgs;
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
    throw Util.inaccessibleMethod();
  }

  override attr(_name: string): Attribute {
    throw Util.inaccessibleMethod();
  }

}
