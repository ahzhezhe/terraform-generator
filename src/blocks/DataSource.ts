import { Block, Argument, Attribute } from '..';

export default class DataSource extends Block {

  readonly type: string;
  readonly name: string;

  constructor(type: string, name: string, args: object) {
    super('data', [type, name], args);

    this.type = type;
    this.name = name;
  }

  asArgument(): Argument {
    return new Argument(`data.${this.type}.${this.name}`);
  }

  getAttribute(name: string): Attribute {
    return new Attribute(this, name);
  }

}
