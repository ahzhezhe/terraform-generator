import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import TerraformGeneratorUtils from './TerraformGeneratorUtils';
import { Block, Resource, Data, Module, Output, Provider, Variable, Backend, Provisioner, ResourceToDataOptions, Locals } from '.';

/**
 * @param dir directoty, default = .
 * @param tfFilename 
 * @param tfvarsFilename 
 * @param format 
 */
export interface WriteOptions {
  /**
   * Directory to write to.
   * Default = .
   */
  dir?: string;
  /**
   * Terraform filename, must ends with .tf.
   * Default = terraform.tf
   */
  tfFilename?: string;
  /**
   * Terraform variables filename, must ends with .tfvars.
   * Default = terraform.tfvars
   */
  tfvarsFilename?: string;
  /**
   * Put true to use 'terraform fmt' to format the configuration, Terraform must be installed.
   * If the terraform binary is named differently in your machine, put the binary name instead.
   * Default = false
   */
  format?: boolean | string;
}

export default class TerraformGenerator {

  private readonly arguments: Record<string, any>;
  private readonly blocks: Block[] = [];
  private variables: Record<string, any> = {};

  /**
   * Construct Terraform generator.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param args arguments
   */
  constructor(args?: Record<string, any>) {
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
      str += TerraformGeneratorUtils.argumentsToString(this.arguments);
      this.blocks.forEach(block => {
        if (block instanceof Backend) {
          str += block.toTerraform();
        }
      });
      str += '}\n\n';
    }

    this.blocks.forEach(block => {
      if (!(block instanceof Backend)) {
        str += block.toTerraform();
      }
    });

    return TerraformGeneratorUtils.unescape(str);
  }

  private generateTfvars(): string {
    let str = '';

    Object.keys(this.variables).forEach(key => {
      str += TerraformGeneratorUtils.argumentsToString({ [key]: this.variables[key] });
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
    if (options.format === true) {
      options.format = 'terraform';
    }

    const result = this.generate();
    shell.mkdir('-p', options.dir);
    fs.writeFileSync(path.join(options.dir, options.tfFilename), result.tf);
    if (result.tfvars) {
      fs.writeFileSync(path.join(options.dir, options.tfvarsFilename), result.tfvars);
    }

    if (options.format) {
      child_process.execSync(`${options.format} fmt`, { cwd: options.dir });
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
   * @param provisioners provisioners
   */
  resource(type: string, name: string, args?: Record<string, any>, provisioners?: Provisioner[]): Resource {
    const block = new Resource(type, name, args, provisioners);
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
  dataFromResource(resource: Resource, options: ResourceToDataOptions, argNames: (string | [string, string])[],
    args?: Record<string, any>): Data {
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
   * Add locals into Terraform.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param args arguments
   */
  locals(args?: Record<string, any>): Locals {
    const block = new Locals(args);
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
   * Add provisioner into Terraform.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param args arguments
   */
  provisioner(type: string, args?: Record<string, any>): Provisioner {
    const block = new Provisioner(type, args);
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
   * Merge this instance with other TerraformGenerator instances.
   * 
   * @param tfgs other instances
   */
  merge(...tfgs: TerraformGenerator[]): TerraformGenerator {
    tfgs.forEach(tfg => {
      this.addBlocks(...tfg.getBlocks());
      this.addVars(tfg.getVars());
    });
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
