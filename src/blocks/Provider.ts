import { Argument, Attribute } from '../arguments';
import { BlockArgs } from '../utils';
import { Block } from '.';

/**
 * @category Block
 */
export class Provider extends Block {

  readonly type: string;

  /**
   * Construct provider.
   *
   * Refer to Terraform documentation on what can be put as type & arguments.
   *
   * @param type type
   * @param args arguments
   */
  constructor(type: string, args: BlockArgs) {
    super('provider', [type], args);

    this.type = type;
  }

  override asArgument(): Argument {
    if (this.getArgument('alias')) {
      return new Argument(`${this.type}.${this.getArgument('alias')}`);
    }
    throw new Error('Provider has no alias.');
  }

  override attr(_name: string): Attribute {
    throw new Error('Inaccessible method.');
  }

}
