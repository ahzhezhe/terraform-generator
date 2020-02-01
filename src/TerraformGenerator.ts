import { Block } from '..';

export type TerraformVersion = '0.11' | '0.12';

export interface TerraformGeneratorOptions {
  version: TerraformVersion;
}

export default class TerraformGenerator {

  readonly options: TerraformGeneratorOptions;
  private readonly blocks: Block[] = [];

  constructor(options: TerraformGeneratorOptions) {
    this.options = options;
  }

  addBlock(block: Block): TerraformGenerator {
    this.blocks.push(block);
    return this;
  }

  generate(): string {
    let str = '';
    this.blocks.forEach(element => {
      str += element.toTerraform();
    });
    return str;
  }

}
