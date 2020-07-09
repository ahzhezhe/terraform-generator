import { TerraformVersion, Attribute, Argument } from '..';
import TerraformGeneratorUtils, { ArgumentsToStringFn } from '../TerraformGeneratorUtils';

export default abstract class Block {

  readonly blockType: string;
  readonly blockNames: string[];
  private readonly arguments: Record<string, any>;
  private readonly customArgumentToString: ArgumentsToStringFn;

  /**
   * Construct block.
   * 
   * @param type type
   * @param names names
   * @param args arguments
   */
  constructor(type: string, names: string[], args?: Record<string, any>, customArgumentToString?: ArgumentsToStringFn) {
    this.validateIdentifier(type);
    names.forEach(name => {
      this.validateIdentifier(name);
    });

    this.blockType = type;
    this.blockNames = names;
    this.arguments = args ? args : {};
    this.customArgumentToString = customArgumentToString;
  }

  /**
   * Get arguments.
   */
  getArguments(): Record<string, any> {
    return this.arguments;
  }

  /**
   * Get argument by key.
   * 
   * @param key key
   */
  getArgument(key: string): any {
    return this.arguments[key];
  }

  /**
   * Set argument.
   * 
   * @param key key
   * @param value value
   */
  setArgument(key: string, value: any): Block {
    this.arguments[key] = value;
    return this;
  }

  /**
   * Set arguments.
   * 
   * @param args arguments
   */
  setArguments(args: Record<string, any>): Block {
    for (const key in args) {
      this.arguments[key] = args[key];
    }
    return this;
  }

  /**
   * Delete argument by key.
   * 
   * @param key key
   */
  deleteArgument(key: string): Block {
    delete this.arguments[key];
    return this;
  }

  /**
   * To Terraform representation.
   * 
   * @param version Terraform version
   */
  toTerraform(version: TerraformVersion): string {
    let str = this.blockType;
    this.blockNames.forEach(name => {
      str += ` "${name}"`;
    });
    str += '{\n';
    str += TerraformGeneratorUtils.argumentsToString(version, this.arguments, this.customArgumentToString);
    str += '}\n\n';
    return str;
  }

  /**
   * Represent block as argument.
   */
  abstract asArgument(): Argument;

  /**
   * Get block's attribute.
   * 
   * @param name attribute name
   */
  abstract attr(name: string): Attribute;

  /**
   * Block's id attribute.
   */
  get id(): Attribute {
    return this.attr('id');
  }

  private validateIdentifier(identifier: string): void {
    if (!identifier.match(/^[a-zA-Z_\-]{1}[0-9a-zA-Z_\-]*$/)) {
      throw new Error(`Invalid identifier: ${identifier}`);
    }
  }

}
