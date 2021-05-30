import { Attribute, Argument } from '..';
import { Util } from '../Util';

/**
 * @category Block
 */
export abstract class Block {

  readonly blockType: string;
  readonly blockNames: string[];
  readonly #arguments: Record<string, any>;
  #innerBlocks: Block[];

  /**
   * Construct block.
   *
   * @param type type
   * @param names names
   * @param args arguments
   */
  constructor(type: string, names: string[], args?: Record<string, any>, innerBlocks?: Block[]) {
    this.#validateIdentifier(type);
    names.forEach(name => {
      this.#validateIdentifier(name);
    });

    this.blockType = type;
    this.blockNames = names;
    this.#arguments = args ? args : {};
    this.#innerBlocks = innerBlocks ? innerBlocks : [];
  }

  /**
   * Get arguments.
   */
  getArguments(): Record<string, any> {
    return this.#arguments;
  }

  /**
   * Get argument by key.
   *
   * @param key key
   */
  getArgument(key: string): any {
    return this.#arguments[key];
  }

  /**
   * Set argument.
   *
   * @param key key
   * @param value value
   */
  setArgument(key: string, value: any): this {
    this.#arguments[key] = value;
    return this;
  }

  /**
   * Set arguments.
   *
   * @param args arguments
   */
  setArguments(args: Record<string, any>): this {
    for (const key in args) {
      this.#arguments[key] = args[key];
    }
    return this;
  }

  /**
   * Delete argument by key.
   *
   * @param key key
   */
  deleteArgument(key: string): this {
    delete this.#arguments[key];
    return this;
  }

  /**
   * Get inner blocks.
   */
  protected getInnerBlocks(): Block[] {
    return this.#innerBlocks;
  }

  /**
   * Set inner blocks.
   */
  protected setInnerBlocks(innerBlocks: Block[] | undefined): this {
    this.#innerBlocks = innerBlocks ? innerBlocks : [];
    return this;
  }

  /**
   * To Terraform representation.
   */
  toTerraform(): string {
    let str = this.blockType;
    this.blockNames.forEach(name => {
      str += ` "${name}"`;
    });
    str += '{\n';
    str += Util.argumentsToString(this.#arguments);
    this.#innerBlocks.forEach(block => {
      str += `${block.toTerraform().trim()}\n`;
    });
    str += '}\n\n';
    return Util.escape(str);
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

  #validateIdentifier(identifier: string): void {
    if (!identifier.match(/^[a-zA-Z_\-]{1}[0-9a-zA-Z_\-]*$/)) {
      throw new Error(`Invalid identifier: ${identifier}`);
    }
  }

}
