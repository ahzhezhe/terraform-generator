import TerraformGenerator, { Block, Identifier, Attribute } from '../..';

export default class Resource extends Block {

  readonly type: string;
  readonly name: string;

  constructor(tfGenerator: TerraformGenerator, type: string, name: string, args?: object) {
    super(tfGenerator, 'resource', [type, name], args);

    this.type = type;
    this.name = name;
  }

  getIdentifier(): Identifier {
    return new Identifier(`${this.type}.${this.name}`);
  }

  getAttribute(name: string): Attribute {
    return new Attribute(this, name);
  }

}
