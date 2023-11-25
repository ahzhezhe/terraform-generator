import { Block } from '../blocks';
import { Argument } from '.';

/**
 * @category Argument
 */
export class Attribute extends Argument {

  /**
   * Construct block's attribute.
   *
   * @param block block
   * @param attrName attribute name
   */
  constructor(block: Block, attrName: string) {
    super(Attribute.#constructArgument(block, attrName));
  }

  static #constructArgument(block: Block, attrName: string): string {
    if (!block) {
      throw new Error('Attribute block cannot be undefined.');
    }
    if (!attrName?.trim()) {
      throw new Error('Attribute name cannot be undefined.');
    }

    return `${block.asArgument().toTerraform()}.${attrName.trim()}`;
  }

}

/**
 * Convenient function to construct new block's [[Attribute]].
 *
 * @param block block
 * @param name attribute name
 *
 * @category Argument
 */
export const attr = (block: Block, name: string): Attribute => new Attribute(block, name);
