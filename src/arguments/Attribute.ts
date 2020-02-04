import { Argument, Block } from '..';

export default class Attribute extends Argument {

  /**
   * Construct block's attribute.
   * 
   * @param block block
   * @param name attribute name
   */
  constructor(block: Block, name: string) {
    super(Attribute.constructArgument(block, name));
  }

  private static constructArgument(block: Block, name: string): string {
    if (!block) {
      throw new Error('Attribute block cannot be null.');
    }
    if (!name || !name.trim()) {
      throw new Error('Attribute name cannot be empty.');
    }

    return `${block.asArgument().toTerraform()}.${name.trim()}`;
  }

}
