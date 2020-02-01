import TerraformGenerator, { Block, Argument, Attribute } from '../..';

export default class Variable extends Block {

  readonly name: string;

  constructor(tfGenerator: TerraformGenerator, name: string, args?: object) {
    super(tfGenerator, 'variable', [name], args);

    this.name = name;
  }

  asArgument(): Argument {
    return new Argument(`var.${this.name}`);
  }

  getAttribute(name: string): Attribute {
    return new Attribute(this, name);
  }

}
