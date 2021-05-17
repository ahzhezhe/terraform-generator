import { Block, Argument, Attribute } from '..';

/**
 * @category Block
 */
export class Provisioner extends Block {

  readonly type: string;

  /**
   * Construct provisioner.
   *
   * Refer to Terraform documentation on what can be put as type & arguments.
   *
   * @param type type
   * @param args arguments
   */
  constructor(type: string, args?: Record<string, any>) {
    super('provisioner', [type], args);

    this.type = type;
  }

  asArgument(): Argument {
    throw new Error('Inaccessible method.');
  }

  attr(_name: string): Attribute {
    throw new Error('Inaccessible method.');
  }

}
