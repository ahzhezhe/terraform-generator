import TerraformGenerator, { Block, Identifier, Attribute } from '../..';

export default class Module extends Block {

  readonly name: string;

  constructor(tfGenerator: TerraformGenerator, name: string, args?: object) {
    super(tfGenerator, 'module', [name], args);

    this.name = name;
  }

  getIdentifier(): Identifier {
    return new Identifier(`module.${this.name}`);
  }

  getAttribute(name: string): Attribute {
    return new Attribute(this, name);
  }

}
