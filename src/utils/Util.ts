import { Argument } from '../arguments';
import { Block } from '../blocks';
import { Map, List } from '../types';
import { BlockArgs } from '.';

export class Util {

  static readonly #escapeChars = [
    ['"', '&tfgquot;']
  ];

  static escape(str: string): string {
    this.#escapeChars.forEach(char => {
      str = str.replaceAll(char[0], char[1]);
    });
    return str;
  }

  static unescape(str: string): string {
    this.#escapeChars.slice().reverse().forEach(char => {
      str = str.replaceAll(char[1], char[0]);
    });
    return str;
  }

  static argumentsToString(args?: BlockArgs): string {
    let str = '';
    for (const key in args) {
      str += this.argumentToString(key, args[key]);
    }
    return str;
  }

  static isObjectArgument(value: any): boolean {
    if (['string', 'number', 'boolean'].indexOf(typeof value) >= 0 ||
      value instanceof Block || value instanceof Argument ||
      value instanceof Map || value instanceof List) {
      return false;
    }
    if (typeof value === 'object') {
      return true;
    }
    throw new Error(`Invalid value: ${value}`);

  }

  static argumentToString(key: string, value: any): string {
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
      } else if (this.isObjectArgument(value)) {
        operator = ' ';
      }

      if (isObjectArray) {
        let str = '';
        if (Array.isArray(value)) {
          value.forEach(element => {
            str += `${key}${operator}${this.argumentValueToString(element)}\n`;
          });
        }
        return str;

      }
      return `${key}${operator}${this.argumentValueToString(value)}\n`;

    } catch (err) {
      throw new Error(`Invalid value: ${key} = ${value}`);
    }
  }

  static argumentValueToString(value: any): string | null {
    if (value == null) {
      return null;
    }

    if (value instanceof Block) {
      return this.argumentValueToString(value.asArgument());
    }

    if (value instanceof Argument) {
      return value.toTerraform();
    }

    if (value instanceof Map) {
      return this.argumentValueToString(value.arguments);
    }

    if (value instanceof List) {
      let str = '[\n';
      value.elements.forEach((element, i) => {
        str += `${this.argumentValueToString(element)}${i < value.elements.length - 1 ? ',' : ''}\n`;
      });
      str += ']';
      return str;
    }

    if (['string', 'number', 'boolean'].indexOf(typeof value) >= 0) {
      return JSON.stringify(value);
    }

    if (typeof value === 'object') {
      if (Array.isArray(value)) {
        let str = '[\n';
        value.forEach((element, i) => {
          str += `${this.argumentValueToString(element)}${i < value.length - 1 ? ',' : ''}\n`;
        });
        str += ']';
        return str;
      }

      let str = '{\n';
      for (const key in value) {
        str += this.argumentToString(key, value[key]);
      }
      str += '}';
      return str;
    }

    throw new Error(`Invalid value: ${value}`);
  }

}
