import { Argument, Attribute } from '../arguments';
import { TerraformArgs, Util } from '../utils';
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
  constructor(args: TerraformArgs) {
    super('locals', [], args);
  }

  override asArgument(): Argument {
    throw Util.inaccessibleMethod();
  }

  override attr(_name: string): Attribute {
    throw Util.inaccessibleMethod();
  }

  arg(name: string): Argument {
    return new Argument(`local.${name}`);
  }

}
