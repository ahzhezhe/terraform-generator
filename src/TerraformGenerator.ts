import shell from 'shelljs';
import fs from 'fs';
import path from 'path';
import { Block, Resource, DataSource, Module, Output, Provider, Variable, Backend } from '.';
import TerraformGeneratorUtils from './TerraformGeneratorUtils';

export type TerraformVersion = '0.11' | '0.12';

/**
 * @param version Terraform version
 */
export interface TerraformGeneratorOptions {
  version: TerraformVersion;
}

/**
 * @param filename Terraform filename, must ends with .tf, default = terraform.tf
 * @param format use 'terraform fmt' to format the plan, Terraform must be installed, default = false
 */
export interface WriteOptions {
  filename?: string;
  format?: boolean
};

export default class TerraformGenerator {

  private readonly options: TerraformGeneratorOptions;
  private readonly arguments: object;
  private readonly blocks: Block[] = [];

  /**
   * Construct Terraform generator.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param options options
   * @param args arguments
   */
  constructor(options: TerraformGeneratorOptions, args?: object) {
    this.options = options;
    this.arguments = args;
  }

  /**
   * Generate Terraform plan as string.
   */
  generate(): string {
    let str = '';

    if (this.arguments || this.blocks.filter(block => block instanceof Backend).length > 0) {
      str += 'terraform {\n';
      str += TerraformGeneratorUtils.argumentsToString(this.options.version, this.arguments);
      this.blocks.forEach(block => {
        if (block instanceof Backend) {
          str += block.toTerraform(this.options.version);
        }
      });
      str += '}\n\n';
    }

    this.blocks.forEach(block => {
      if (!(block instanceof Backend)) {
        str += block.toTerraform(this.options.version);
      }
    });

    return str;
  }

  /**
   * Write Terraform plan to a file.
   * 
   * @param dir directory
   * @param options options
   */
  write(dir: string, options?: WriteOptions): void {
    if (!options) {
      options = {};
    }
    if (!options.filename) {
      options.filename = 'terraform.tf';
    }
    if (!options.filename.endsWith('.tf')) {
      options.filename += '.tf';
    }

    if (!fs.existsSync(dir)) {
      shell.mkdir('-p', dir);
    }
    fs.writeFileSync(path.join(dir, options.filename), this.generate());

    if (options.format) {
      shell.exec(`cd ${dir} && terraform fmt`);
    }
  }

  /**
   * Add block into Terraform.
   * 
   * @param block block
   */
  addBlock(block: Block): TerraformGenerator {
    this.blocks.push(block);
    return this;
  }

  /**
   * Add provider into Terraform.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param args arguments
   */
  addProvider(type: string, args?: object): Provider {
    const block = new Provider(type, args);
    this.addBlock(block);
    return block;
  }

  /**
   * Add resource into Terraform.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param name name
   * @param args arguments
   */
  addResource(type: string, name: string, args?: object): Resource {
    const block = new Resource(type, name, args);
    this.addBlock(block);
    return block;
  }

  /**
   * Add data source into Terraform.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param name name
   * @param args arguments
   */
  addDataSource(type: string, name: string, args?: object): DataSource {
    const block = new DataSource(type, name, args);
    this.addBlock(block);
    return block;
  }

  /**
   * Add module into Terraform.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param name name
   * @param args arguments
   */
  addModule(name: string, args?: object): Module {
    const block = new Module(name, args);
    this.addBlock(block);
    return block;
  }

  /**
   * Add output into Terraform.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param name name
   * @param args arguments
   */
  addOutput(name: string, args?: object): Output {
    const block = new Output(name, args);
    this.addBlock(block);
    return block;
  }

  /**
   * Add provider into Terraform.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param name name
   * @param args arguments
   */
  addVariable(name: string, args?: object): Variable {
    const block = new Variable(name, args);
    this.addBlock(block);
    return block;
  }

  /**
   * Add backend into Terraform.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param args arguments
   */
  addBackend(type: string, args?: object): Backend {
    const block = new Backend(type, args);
    this.addBlock(block);
    return block;
  }

}
