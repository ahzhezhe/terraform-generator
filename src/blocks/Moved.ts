import { Argument, Attribute } from '../arguments';
import { Util } from '../utils';
import { Block, Resource } from '.';

/**
 * @category Block
 */
export interface MovedArgs {
  from: Argument;
  to: Argument | Resource;
}

/**
 * @category Block
 */
export class Moved extends Block<MovedArgs> {

  /**
   * Construct moved.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param args arguments
   */
  constructor(args: MovedArgs) {
    super('moved', [], args);
  }

  override asArgument(): Argument {
    throw Util.inaccessibleMethod();
  }

  override attr(_name: string): Attribute {
    throw Util.inaccessibleMethod();
  }

}
