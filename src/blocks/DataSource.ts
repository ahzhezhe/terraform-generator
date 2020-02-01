import TerraformGenerator, { Block, Identifier, Attribute } from '../..';

export default class DataSource extends Block {

  readonly type: string;
  readonly name: string;

  constructor(tfGenerator: TerraformGenerator, type: string, name: string, args?: object) {
    super(tfGenerator, 'data', [type, name], args);

    this.type = type;
    this.name = name;
  }

  getIdentifier(): Identifier {
    return new Identifier(`data.${this.type}.${this.name}`);
  }

  getAttribute(name: string): Attribute {
    return new Attribute(this, name);
  }

}
