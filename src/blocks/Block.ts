import TerraformGenerator, { TerraformVersion, Attribute, Argument } from '..';

export default abstract class Block {

  readonly blockType: string;
  readonly blockNames: string[];
  private readonly arguments: object;

  constructor(type: string, names: string[], args?: object) {
    this.validateIdentifier(type);
    names.forEach(name => {
      this.validateIdentifier(name);
    });

    this.blockType = type;
    this.blockNames = names;
    this.arguments = args ? args : {};
  }

  getArguments(): object {
    return this.arguments;
  }

  getArgument(key: string): any {
    return this.arguments[key];
  }

  setArgument(key: string, value: any): Block {
    this.arguments[key] = value;
    return this;
  }

  setArguments(args: object): Block {
    for (const key in args) {
      this.arguments[key] = args[key];
    }
    return this;
  }

  deleteArgument(key: string): Block {
    delete this.arguments[key];
    return this;
  }

  toTerraform(version: TerraformVersion): string {
    let str = this.blockType;
    this.blockNames.forEach(name => {
      str += ` "${name}"`;
    });
    str += '{\n';
    str += TerraformGenerator.argumentsToString(version, this.arguments);
    str += '}\n\n';
    return str;
  }

  abstract asArgument(): Argument;

  abstract getAttribute(name: string): Attribute;

  private validateIdentifier(identifier: string): void {
    if (!identifier.match(/^[a-zA-Z_\-]{1}[0-9a-zA-Z_\-]*$/)) {
      throw new Error(`Invalid identifier: ${identifier}`);
    }
  }

}
