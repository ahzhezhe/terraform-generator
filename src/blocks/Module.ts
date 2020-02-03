import { Block, Argument, Attribute } from '..';

export default class Module extends Block {

  readonly name: string;

  constructor(name: string, args: object) {
    super('module', [name], args);

    this.name = name;
  }

  asArgument(): Argument {
    return new Argument(`module.${this.name}`);
  }

  getAttribute(name: string): Attribute {
    return new Attribute(this, name);
  }

}
