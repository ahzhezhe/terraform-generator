import { TerraformVersion, Block, Argument, Map } from '.';

export default class TerraformGeneratorUtils {

  static argumentsToString(version: TerraformVersion, args: object): string {
    let str = '';
    for (const key in args) {
      str += this.argumentToString(version, key, args[key]);
    }
    return str;
  };

  static isObjectArgument(value: any): boolean {
    if (['string', 'number', 'boolean'].indexOf(typeof value) >= 0
      || value instanceof Block || value instanceof Argument || value instanceof Map) {
      return false;

    } else if (typeof value === 'object') {
      return true;

    } else {
      throw new Error(`Invalid value: ${value}`);
    }
  };

  static argumentToString(version: TerraformVersion, key: string, value: any): string {
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

  static argumentValueToString(version: TerraformVersion, value: any): string {
    if (value instanceof Block) {
      return this.argumentValueToString(version, value.asArgument());

    } else if (value instanceof Argument) {
      if (version && version === '0.11' && !value.asIs) {
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
