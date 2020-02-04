import { Block, Resource, DataSource, Module, Output, Provider, Variable, Backend } from '.';

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
    this.blocks.forEach(block => {
      str += block.toTerraform(this.options.version);
    });
    return str;
  }

  addProvider(name: string, args: object): Provider {
    const block = new Provider(name, args);
    this.addBlock(block);
    return block;
  }

  addResource(type: string, name: string, args: object): Resource {
    const block = new Resource(type, name, args);
    this.addBlock(block);
    return block;
  }

  addDataSource(type: string, name: string, args: object): DataSource {
    const block = new DataSource(type, name, args);
    this.addBlock(block);
    return block;
  }

  addModule(name: string, args: object): Module {
    const block = new Module(name, args);
    this.addBlock(block);
    return block;
  }

  addOutput(name: string, args: object): Output {
    const block = new Output(name, args);
    this.addBlock(block);
    return block;
  }

  addVariable(name: string, args: object): Variable {
    const block = new Variable(name, args);
    this.addBlock(block);
    return block;
  }

  addBackend(type: string, args: object): Backend {
    const block = new Backend(type, args);
    this.addBlock(block);
    return block;
  }

}
