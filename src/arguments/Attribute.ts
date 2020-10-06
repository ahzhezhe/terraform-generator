import { Argument, Block } from '..';

export default class Attribute extends Argument {

  /**
   * Construct block's attribute.
   *
   * @param block block
   * @param attrName attribute name
   */
  constructor(block: Block, attrName: string) {
    super(Attribute.constructArgument(block, attrName));
  }

  private static constructArgument(block: Block, attrName: string): string {
    if (!block) {
      throw new Error('Attribute block cannot be null.');
    }
    if (!attrName || !attrName.trim()) {
      throw new Error('Attribute name cannot be empty.');
    }

    return `${block.asArgument().toTerraform()}.${attrName.trim()}`;
  }

}

/**
 * Convenient function to construct new block's attribute.
 *
 * @param block block
 * @param name attribute name
 */
export const attr = (block: Block, name: string): Attribute => new Attribute(block, name);
