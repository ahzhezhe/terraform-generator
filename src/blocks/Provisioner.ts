import { Block, Argument, Attribute } from '..';

export default class Provisioner extends Block {

  readonly type: string;

  /**
   * Construct provisioner.
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
    throw new Error('Inaccessible function.');
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  attr(name: string): Attribute {
    throw new Error('Inaccessible function.');
  }

}
