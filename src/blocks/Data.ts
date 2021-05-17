import { Block, Argument, Attribute } from '..';

/**
 * @category Block
 */
export class Data extends Block {

  readonly type: string;
  readonly name: string;

  /**
   * Construct data source.
   *
   * Refer to Terraform documentation on what can be put as type & arguments.
   *
   * @param type type
   * @param name name
   * @param args arguments
   */
  constructor(type: string, name: string, args?: Record<string, any>) {
    super('data', [type, name], args);

    this.type = type;
    this.name = name;
  }

  asArgument(): Argument {
    return new Argument(`data.${this.type}.${this.name}`);
  }

  attr(name: string): Attribute {
    return new Attribute(this, name);
  }

}
