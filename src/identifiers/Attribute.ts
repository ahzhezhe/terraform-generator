import { Identifier, Block } from '../..';

export default class Attribute extends Identifier {

  constructor(block: Block, name: string) {
    super(`${block.getIdentifier().toTerraform()}.${name}`);
  }

}
