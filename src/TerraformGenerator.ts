import { Block, Resource, DataSource, Module, Output, Provider, Variable, Backend, Argument, Map } from '.';

export type TerraformVersion = '0.11' | '0.12';

export interface TerraformGeneratorOptions {
  version: TerraformVersion;
}

export default class TerraformGenerator {

  private readonly options: TerraformGeneratorOptions;
  private readonly arguments: object;
  private readonly blocks: Block[] = [];

  constructor(options: TerraformGeneratorOptions, args?: object) {
    this.options = options;
    this.arguments = args;
  }

  addBlock(block: Block): TerraformGenerator {
    this.blocks.push(block);
    return this;
  }

  generate(): string {
    let str = '';

    if (this.arguments || this.blocks.filter(block => block instanceof Backend).length > 0) {
      str += 'terraform {\n';
      str += TerraformGenerator.argumentsToString(this.options.version, this.arguments);
      this.blocks.forEach(block => {
        if (block instanceof Backend) {
          str += block.toTerraform(this.options.version);
        }
      });
      str += '}\n\n';
    }

    this.blocks.forEach(block => {
      if (!(block instanceof Backend)) {
        str += block.toTerraform(this.options.version);
      }
    });

    return str;
  }

  static argumentsToString(version: TerraformVersion, args: object): string {
    let str = '';
    for (const key in args) {
      str += this.argumentToString(version, key, args[key]);
    }
    return str;
  }

  private static isObjectArgument(value: any): boolean {
    if (['string', 'number', 'boolean'].indexOf(typeof value) >= 0
      || value instanceof Block || value instanceof Argument || value instanceof Map) {
      return false;

    } else if (typeof value === 'object') {
      return true;

    } else {
      throw new Error(`Invalid value: ${value}`);
    }
  }

  private static argumentToString(version: TerraformVersion, key: string, value: any): string {
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

  private static argumentValueToString(version: TerraformVersion, value: any): string {
    if (value instanceof Block) {
      return this.argumentValueToString(version, value.asArgument());

    } else if (value instanceof Argument) {
      if (value.asIs) {
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

  addProvider(name: string, args: object): Provider {
    const block = new Provider(name, args);
    this.addBlock(block);
    return block;
  }

  addResource(type: string, name: string, args: object): Resource {
    const block = new Resource(type, name, args);
    this.addBlock(block);
    return block;
  }

  addDataSource(type: string, name: string, args: object): DataSource {
    const block = new DataSource(type, name, args);
    this.addBlock(block);
    return block;
  }

  addModule(name: string, args: object): Module {
    const block = new Module(name, args);
    this.addBlock(block);
    return block;
  }

  addOutput(name: string, args: object): Output {
    const block = new Output(name, args);
    this.addBlock(block);
    return block;
  }

  addVariable(name: string, args: object): Variable {
    const block = new Variable(name, args);
    this.addBlock(block);
    return block;
  }

  addBackend(type: string, args: object): Backend {
    const block = new Backend(type, args);
    this.addBlock(block);
    return block;
  }

}
