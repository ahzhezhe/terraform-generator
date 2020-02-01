import TerraformGenerator, { Block, Argument, Attribute } from '../..';

export default class Module extends Block {

  readonly name: string;

  constructor(tfGenerator: TerraformGenerator, name: string, args?: object) {
    super(tfGenerator, 'module', [name], args);

    this.name = name;
  }

  asArgument(): Argument {
    return new Argument(`module.${this.name}`);
  }

  getAttribute(name: string): Attribute {
    return new Attribute(this, name);
  }

}
