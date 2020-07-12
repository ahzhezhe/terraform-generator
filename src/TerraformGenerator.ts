import shell from 'shelljs';
import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import { Block, Resource, Data, Module, Output, Provider, Variable, Backend, ResourceToDataOptions } from '.';
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
 * @param tfFilename Terraform filename, must ends with .tf, default = terraform.tf
 * @param tfvarsFilename Terraform variables filename, must ends with .tfvars, default = terraform.tfvars
 * @param format use 'terraform fmt' to format the configuration, Terraform must be installed, default = false
 */
export interface WriteOptions {
  dir?: string;
  tfFilename?: string;
  tfvarsFilename?: string;
  format?: boolean;
}

export default class TerraformGenerator {

  private readonly options: TerraformGeneratorOptions;
  private readonly arguments: Record<string, any>;
  private readonly blocks: Block[] = [];
  private variables: Record<string, any> = {};

  /**
   * Construct Terraform generator.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param options options
   * @param args arguments
   */
  constructor(options: TerraformGeneratorOptions, args?: Record<string, any>) {
    this.options = options;
    this.arguments = args;
  }

  /**
   * Generate Terraform configuration as string.
   */
  generate(): { tf: string; tfvars: string } {
    return {
      tf: this.generateTf(),
      tfvars: Object.keys(this.variables).length > 0 ? this.generateTfvars() : null
    };
  }

  private generateTf(): string {
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

  private generateTfvars(): string {
    let str = '';

    Object.keys(this.variables).forEach(key => {
      str += TerraformGeneratorUtils.argumentsToString(this.options.version, { [key]: this.variables[key] });
      str += '\n';
    });

    return str;
  }

  /**
   * Write Terraform configuration to a file.
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
    if (!options.tfFilename) {
      options.tfFilename = 'terraform.tf';
    }
    if (!options.tfFilename.endsWith('.tf')) {
      options.tfFilename += '.tf';
    }
    if (!options.tfvarsFilename) {
      options.tfvarsFilename = 'terraform.tfvars';
    }
    if (!options.tfvarsFilename.endsWith('.tfvars')) {
      options.tfvarsFilename += '.tfvars';
    }

    const result = this.generate();
    shell.mkdir('-p', options.dir);
    fs.writeFileSync(path.join(options.dir, options.tfFilename), result.tf);
    if (result.tfvars) {
      fs.writeFileSync(path.join(options.dir, options.tfvarsFilename), result.tfvars);
    }

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
  provider(type: string, args?: Record<string, any>): Provider {
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
  resource(type: string, name: string, args?: Record<string, any>): Resource {
    const block = new Resource(type, name, args);
    this.addBlocks(block);
    return block;
  }
  /**
   * Convert resource into data source and add it into Terraform.
   * 
   * @param resource resource
   * @param options options
   * @param argNames names of resource arguments to be converted into data source arguments;
   * use array for name mapping, position 0 = original resource's argument name, position 1 = mapped data source's argument name
   * @param args extra arguments
   */
  dataFromResource(resource: Resource, options: ResourceToDataOptions, argNames: (string | [string, string])[], args?: Record<string, any>): Data {
    const block = resource.toData(options, argNames, args);
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
  data(type: string, name: string, args?: Record<string, any>): Data {
    const block = new Data(type, name, args);
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
  module(name: string, args?: Record<string, any>): Module {
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
  output(name: string, args?: Record<string, any>): Output {
    const block = new Output(name, args);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add variable into Terraform.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param name name
   * @param args arguments
   * @param value variable value
   */
  variable(name: string, args?: Record<string, any>, value?: any): Variable {
    const block = new Variable(name, args);
    this.addBlocks(block);
    if (value != null) {
      this.addVars({ [name]: value });
    }
    return block;
  }

  /**
   * Add backend into Terraform.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param args arguments
   */
  backend(type: string, args?: Record<string, any>): Backend {
    const block = new Backend(type, args);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add variable values into Terraform.
   * 
   * @param variables variables
   */
  addVars(variables: Record<string, any>): TerraformGenerator {
    this.variables = {
      ...this.variables,
      ...variables
    };
    return this;
  }

  /**
   * Get arguments.
   */
  getArguments(): Record<string, any> {
    return this.arguments;
  }

  /**
   * Get blocks.
   */
  getBlocks(): Block[] {
    return this.blocks;
  }

  /**
   * Get variables.
   */
  getVars(): Record<string, any> {
    return this.variables;
  }

}
