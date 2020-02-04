import { Block, Argument, Attribute } from '..';

export default class Variable extends Block {

  readonly name: string;

  /**
   * Construct variable.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param name name
   * @param args arguments
   */
  constructor(name: string, args?: object) {
    super('variable', [name], args);

    this.name = name;
  }

  asArgument(): Argument {
    return new Argument(`var.${this.name}`);
  }

  getAttribute(name: string): Attribute {
    return new Attribute(this, name);
  }

}
