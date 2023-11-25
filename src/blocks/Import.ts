import { Argument, Attribute } from '../arguments';
import { Util } from '../utils';
import { Block, Resource } from '.';

/**
 * @category Block
 */
export interface ImportArgs {
  to: Resource;
  id: string;
  provider?: Argument;
}

/**
 * @category Block
 */
export class Import extends Block<ImportArgs> {

  /**
   * Construct import.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param args arguments
   */
  constructor(args: ImportArgs) {
    super('import', [], args);
  }

  override asArgument(): Argument {
    throw Util.inaccessibleMethod();
  }

  override attr(_name: string): Attribute {
    throw Util.inaccessibleMethod();
  }

}
