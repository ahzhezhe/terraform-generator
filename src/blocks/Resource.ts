import TerraformGenerator, { Block, Argument, Attribute } from '../..';

export default class Resource extends Block {

  readonly type: string;
  readonly name: string;

  constructor(tfGenerator: TerraformGenerator, type: string, name: string, args?: object) {
    super(tfGenerator, 'resource', [type, name], args);

    this.type = type;
    this.name = name;
  }

  asArgument(): Argument {
    return new Argument(`${this.type}.${this.name}`);
  }

  getAttribute(name: string): Attribute {
    return new Attribute(this, name);
  }

}
