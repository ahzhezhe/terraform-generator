import { Argument, Attribute } from '../arguments';
import { Util } from '../utils';
import { Block, Resource } from '.';

/**
 * @category Block
 */
export interface RequiredProvidersArgs {
  to: Resource;
  id: string;
  provider?: Argument;
}

/**
 * @category Block
 */
export class RequiredProviders extends Block<RequiredProvidersArgs> {

  /**
   * Construct import.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param args arguments
   */
  constructor(args: RequiredProvidersArgs) {
    super('required_providers', [], args, undefined, true);
  }

  override asArgument(): Argument {
    throw Util.inaccessibleMethod();
  }

  override attr(_name: string): Attribute {
    throw Util.inaccessibleMethod();
  }

}
