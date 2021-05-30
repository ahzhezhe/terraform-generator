import { Argument, Attribute } from '../arguments';
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
  constructor(type: string, args?: Record<string, any>) {
    super('provider', [type], args);

    this.type = type;
  }

  asArgument(): Argument {
    if (this.getArgument('alias')) {
      return new Argument(`${this.type}.${this.getArgument('alias')}`);
    }
    throw new Error('Provider has no alias.');
  }

  attr(_name: string): Attribute {
    throw new Error('Inaccessible method.');
  }

}
