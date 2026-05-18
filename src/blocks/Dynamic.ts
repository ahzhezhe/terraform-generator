import { Argument, Attribute } from '../arguments';
import { TerraformArgs, Util } from '../utils';
import { Block } from '.';

/**
 * @category Block
 */
export class Dynamic extends Block {

  /**
   * Construct dynamic.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param name name
   * @param args arguments
   */
  constructor(name: string, args: TerraformArgs) {
    super('dynamic', [name], args);
  }

  override asArgument(): Argument {
    throw Util.inaccessibleMethod();
  }

  override attr(_name: string): Attribute {
    throw Util.inaccessibleMethod();
  }

  arg(_name: string): Argument {
    throw Util.inaccessibleMethod();
  }

}
