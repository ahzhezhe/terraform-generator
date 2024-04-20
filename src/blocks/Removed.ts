import { Argument, Attribute } from '../arguments';
import { TerraformElement, Util } from '../utils';
import { Block } from '.';

/**
 * @category Block
 */
export interface RemovedArgs {
  from: TerraformElement;
  lifecycle: {
    destroy: boolean;
  };
}

/**
 * @category Block
 */
export class Removed extends Block<RemovedArgs> {

  /**
   * Construct removed.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param args arguments
   */
  constructor(args: RemovedArgs) {
    super('removed', [], args);
  }

  override asArgument(): Argument {
    throw Util.inaccessibleMethod();
  }

  override attr(_name: string): Attribute {
    throw Util.inaccessibleMethod();
  }

}
