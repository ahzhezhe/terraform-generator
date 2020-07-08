import { Block, Argument, Attribute } from '..';
import TerraformGeneratorUtils from '../TerraformGeneratorUtils';

export default class Variable extends Block {

  readonly name: string;

  /**
   * Construct variable.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param name name
   * @param args arguments
   */
  constructor(name: string, args?: Record<string, any>) {
    super('variable', [name], args, (version, key, value) => {
      if (version === '0.12' && key === 'type' && typeof value === 'string') {
        return `${key} = ${value}\n`;
      } else {
        return TerraformGeneratorUtils.argumentToString(version, key, value);
      }
    });

    this.name = name;
  }

  asArgument(): Argument {
    return new Argument(`var.${this.name}`);
  }

  attr(name: string): Attribute {
    return new Attribute(this, name);
  }

}
