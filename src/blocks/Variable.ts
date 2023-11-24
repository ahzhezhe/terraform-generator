import { Argument, Attribute } from '../arguments';
import { BlockArgs } from '../utils';
import { Block } from '.';

/**
 * @category Block
 */
export interface VariableArgs {
  type: Argument;
  default?: any;
  description?: string;
  sensitive?: boolean;
  nullable?: boolean;
  validation?: BlockArgs;
}

/**
 * @category Block
 */
export class Variable extends Block<VariableArgs> {

  readonly name: string;

  /**
   * Construct variable.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param name name
   * @param args arguments
   */
  constructor(name: string, args: VariableArgs) {
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
