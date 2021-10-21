import { Argument, Attribute } from '../arguments';
import { Block } from '.';

/**
 * @category Block
 */
export class Variable extends Block {

  readonly name: string;

  /**
   * Construct variable.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param name name
   * @param args arguments
   */
  constructor(name: string, args?: Record<string, any>) {
    super('variable', [name], args);

    this.name = name;
  }

  override asArgument(): Argument {
    return new Argument(`var.${this.name}`);
  }

  override attr(name: string): Attribute {
    return new Attribute(this, name);
  }

}
