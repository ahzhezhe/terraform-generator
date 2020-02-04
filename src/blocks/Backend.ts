import { Block, Argument, Attribute } from '..';

export default class Backend extends Block {

  readonly type: string;

  /**
   * Construct backend.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param args arguments
   */
  constructor(type: string, args?: object) {
    super('backend', [type], args);

    this.type = type;
  }

  asArgument(): Argument {
    return new Argument(JSON.stringify(this.type), true);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getAttribute(name: string): Attribute {
    throw new Error('Inaccessible function.');
  }

}
