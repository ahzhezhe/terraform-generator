import { Argument, Attribute } from '../arguments';
import { TerraformArgs } from '../utils';
import { Block } from '.';

/**
 * @category Block
 */
export interface ModuleArgs extends TerraformArgs {
  source: string;
  version?: string;
}

/**
 * @category Block
 */
export class Module extends Block<ModuleArgs> {

  readonly name: string;

  /**
   * Construct module.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param name name
   * @param args arguments
   */
  constructor(name: string, args: ModuleArgs) {
    super('module', [name], args);

    this.name = name;
  }

  override asArgument(): Argument {
    return new Argument(`module.${this.name}`);
  }

  override attr(name: string): Attribute {
    return new Attribute(this, name);
  }

}
