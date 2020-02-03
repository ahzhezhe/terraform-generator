import { TerraformVersion, Attribute, Argument, Heredoc, Map } from '..';

export default abstract class Block {

  readonly blockType: string;
  readonly blockNames: string[];
  private readonly arguments: object;

  constructor(type: string, names: string[], args: object) {
    this.validateIdentifier(type);
    if (names.length === 0) {
      throw new Error('Names cannot be empty.');
    }
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
    str += this.argumentsToString(version, this.arguments);
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

  private isObjectArgument(value: any): boolean {
    if (['string', 'number', 'boolean'].indexOf(typeof value) >= 0
      || value instanceof Block || value instanceof Argument || value instanceof Map) {
      return false;

    } else if (typeof value === 'object') {
      return true;

    } else {
      throw new Error(`Invalid value: ${value}`);
    }
  }

  private argumentsToString(version: TerraformVersion, args: object): string {
    let str = '';
    for (const key in args) {
      str += this.argumentToString(version, key, args[key]);
    }
    return str;
  }

  private argumentToString(version: TerraformVersion, key: string, value: any): string {
    try {
      if (value == null) {
        return '';
      }

      let operator = ' = ';
      let isObjectArray = false;

      if (Array.isArray(value)) {
        if (value.length === 0 || this.isObjectArgument(value[0])) {
          operator = ' ';
          isObjectArray = true;
        }
      } else {
        if (this.isObjectArgument(value)) {
          operator = ' ';
        }
      }

      if (isObjectArray) {
        let str = '';
        if (Array.isArray(value)) {
          value.forEach(element => {
            str += `${key}${operator}${this.argumentValueToString(version, element)}\n`;
          });
        }
        return str;

      } else {
        return `${key}${operator}${this.argumentValueToString(version, value)}\n`;
      }

    } catch (err) {
      throw new Error(`Invalid value: ${key} = ${value}`);
    }
  };

  private argumentValueToString(version: TerraformVersion, value: any): string {
    if (value instanceof Block) {
      return this.argumentValueToString(version, value.asArgument());

    } else if (value instanceof Argument) {
      if (value instanceof Heredoc) {
        return value.toTerraform();
      }

      if (version === '0.11') {
        return `"\${${value.toTerraform()}}"`;
      } else {
        return value.toTerraform();
      }

    } else if (value instanceof Map) {
      return this.argumentValueToString(version, value.args);

    } else if (['string', 'number', 'boolean'].indexOf(typeof value) >= 0) {
      return JSON.stringify(value);

    } else if (typeof value === 'object') {
      if (Array.isArray(value)) {
        let str = '[\n';
        value.forEach(element => {
          str += `${this.argumentValueToString(version, element)},\n`;
        });
        str += ']';
        return str;

      } else {
        let str = '{\n';
        for (const key in value) {
          str += this.argumentToString(version, key, value[key]);
        }
        str += '}';
        return str;
      }

    } else {
      throw new Error(`Invalid value: ${value}`);
    }
  }

}
