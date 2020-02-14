import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import { Block, Resource, DataSource, Module, Output, Provider, Variable, Backend, ResourceToDataSourceOptions } from '.';
import TerraformGeneratorUtils from './TerraformGeneratorUtils';

export type TerraformVersion = '0.11' | '0.12';

/**
 * @param version Terraform version
 */
export interface TerraformGeneratorOptions {
  version: TerraformVersion;
}

/**
 * @param dir directoty, default = .
 * @param filename Terraform filename, must ends with .tf, default = terraform.tf
 * @param format use 'terraform fmt' to format the plan, Terraform must be installed, default = false
 */
export interface WriteOptions {
  dir?: string;
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
   * @param options options
   */
  write(options?: WriteOptions): void {
    if (!options) {
      options = {};
    }
    if (!options.dir) {
      options.dir = '.';
    }
    if (!options.filename) {
      options.filename = 'terraform.tf';
    }
    if (!options.filename.endsWith('.tf')) {
      options.filename += '.tf';
    }

    fs.mkdirSync(options.dir, { recursive: true });
    fs.writeFileSync(path.join(options.dir, options.filename), this.generate());

    if (options.format) {
      child_process.execSync('terraform fmt', { cwd: options.dir });
    }
  }

  /**
   * Add blocks into Terraform.
   * 
   * @param blocks blocks
   */
  addBlocks(...blocks: Block[]): TerraformGenerator {
    blocks.forEach(block => this.blocks.push(block));
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
    this.addBlocks(block);
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
    this.addBlocks(block);
    return block;
  }
  /**
   * Convert resource into data source and add it into Terraform.
   * 
   * @param resource resource
   * @param options options
   * @param argNames names of resource arguments to converted into data source arguments;
   * use array for name mapping, position 0 = original resource name, position 1 = mapped data source name
   * @param args extra arguments
   */
  addDataSourceFromResource(resource: Resource, options: ResourceToDataSourceOptions,
    argNames: (string | [string, string])[], args?: object): DataSource {
    const block = resource.toDataSource(options, argNames, args);
    this.addBlocks(block);
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
    this.addBlocks(block);
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
    this.addBlocks(block);
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
    this.addBlocks(block);
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
    this.addBlocks(block);
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
    this.addBlocks(block);
    return block;
  }

}
