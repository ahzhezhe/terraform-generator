import { Argument, Attribute } from '../arguments';
import { IDENTIFIER_REGEX, TerraformArgs, TerraformElement, Util } from '../utils';

/**
 * @category Block
 */
export abstract class Block<Args extends TerraformArgs = TerraformArgs> extends TerraformElement {

  readonly blockType: string;
  readonly blockNames: string[];
  #arguments: Args;
  #innerBlocks: Block[];
  readonly #insideTerraformBlock: boolean;

  /**
   * Construct block.
   *
   * @param type type
   * @param names names
   * @param args arguments
   */
  constructor(type: string, names: string[], args: Args, innerBlocks?: Block[], insideTerraformBlock = false) {
    super();

    this.#validateIdentifier(type);
    names.forEach(name => {
      this.#validateIdentifier(name);
    });

    this.blockType = type;
    this.blockNames = names;
    this.#arguments = args;
    this.#innerBlocks = innerBlocks ? innerBlocks : [];
    this.#insideTerraformBlock = insideTerraformBlock;
  }

  /**
   * Is this block to be placed inside top-level terraform block.
   */
  isInsideTerraformBlock() {
    return this.#insideTerraformBlock;
  }

  /**
   * Get arguments.
   */
  getArguments(): Args {
    return this.#arguments;
  }

  /**
   * Get argument by key.
   *
   * @param key key
   */
  getArgument<K extends keyof Args>(key: K): Args[K] {
    return this.#arguments[key];
  }

  /**
   * Set argument.
   *
   * @param key key
   * @param value value
   */
  setArgument<K extends keyof Args>(key: K, value: Args[K]): this {
    this.#arguments[key] = value;
    return this;
  }

  /**
   * Set arguments.
   *
   * @param args arguments
   */
  setArguments(args: Partial<Args>): this {
    this.#arguments = {
      ...this.#arguments,
      ...args
    };
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

  override toTerraform(): string {
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
    if (!identifier.match(IDENTIFIER_REGEX)) {
      throw new Error(`Invalid identifier: ${identifier}`);
    }
  }

}
