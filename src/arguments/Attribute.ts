import { Argument, Block } from '..';

export default class Attribute extends Argument {

  constructor(block: Block, name: string) {
    super(`${block.asArgument().toTerraform()}.${name}`);
  }

}
