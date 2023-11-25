import { Argument, Attribute } from '../arguments';
import { TerraformArgs, Util } from '../utils';
import { Block } from '.';

/**
 * @category Block
 */
export class Backend extends Block {

  readonly type: string;

  /**
   * Construct backend.
   *
   * Refer to Terraform documentation on what can be put as type & arguments.
   *
   * @param type type
   * @param args arguments
   */
  constructor(type: string, args: TerraformArgs) {
    super('backend', [type], args, undefined, true);

    this.type = type;
  }

  override asArgument(): Argument {
    return new Argument(JSON.stringify(this.type));
  }

  override attr(_name: string): Attribute {
    throw Util.inaccessibleMethod();
  }

}
