import { Block, Argument, Attribute } from '..';

export default class Data extends Block {

  readonly type: string;
  readonly name: string;

  /**
   * Construct data source.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param name name
   * @param args arguments
   * @param innerBlocks inner blocks
   */
  constructor(type: string, name: string, args?: Record<string, any>, innerBlocks?: Block[]) {
    super('data', [type, name], args, innerBlocks);

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
