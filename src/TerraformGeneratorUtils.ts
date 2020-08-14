import replaceString from 'replace-string';
import { TerraformVersion, Block, Argument, Map } from '.';

export type ArgumentsToStringFn = (version: TerraformVersion, key: string, value: any) => string;

export default class TerraformGeneratorUtils {

  private static readonly escapeChars = [
    ['"', '&tfgquot;']
  ];

  static escape(str: string): string {
    this.escapeChars.forEach(char => str = replaceString(str, char[0], char[1]));
    return str;
  }

  static unescape(str: string): string {
    this.escapeChars.slice().reverse().forEach(char => str = replaceString(str, char[1], char[0]));
    return str;
  }

  static argumentsToString(version: TerraformVersion, args: Record<string, any>, customArgumentToString?: ArgumentsToStringFn): string {
    let str = '';
    for (const key in args) {
      if (customArgumentToString) {
        str += customArgumentToString(version, key, args[key]);
      } else {
        str += this.argumentToString(version, key, args[key]);
      }
    }
    return str;
  }

  static isObjectArgument(value: any): boolean {
    if (['string', 'number', 'boolean'].indexOf(typeof value) >= 0
      || value instanceof Block || value instanceof Argument || value instanceof Map) {
      return false;

    } else if (typeof value === 'object') {
      return true;

    } else {
      throw new Error(`Invalid value: ${value}`);
    }
  }

  static argumentToString(version: TerraformVersion, key: string, value: any): string {
    try {
      if (value == null) {
        return '';
      }

      if (key.indexOf(' ') > 0) {
        key = `"${key}"`;
      }

      let operator = ' = ';
      let isObjectArray = false;

      if (Array.isArray(value)) {
        if (value.length === 0 || this.isObjectArgument(value[0])) {
          value = value.filter(element => element != null);
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
  }

  static argumentValueToString(version: TerraformVersion, value: any): string {
    if (value == null) {
      return null;

    } else if (value instanceof Block) {
      return this.argumentValueToString(version, value.asArgument());

    } else if (value instanceof Argument) {
      if (version && version === '0.11' && !value.asIs) {
        return `"\${${value.toTerraform()}}"`;
      } else {
        return value.toTerraform();
      }

    } else if (value instanceof Map) {
      return this.argumentValueToString(version, value.arguments);

    } else if (['string', 'number', 'boolean'].indexOf(typeof value) >= 0) {
      return JSON.stringify(value);

    } else if (typeof value === 'object') {
      if (Array.isArray(value)) {
        let str = '[\n';
        value.forEach((element, i) => {
          str += `${this.argumentValueToString(version, element)}${i < value.length - 1 ? ',' : ''}\n`;
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
