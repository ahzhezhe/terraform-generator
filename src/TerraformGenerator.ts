import child_process from 'child_process';
import fs from 'fs';
import path from 'path';
import shell from 'shelljs';
import { Block, Comment, Resource, Data, Module, Output, Provider, Variable, Backend, Provisioner, ResourceToDataOptions, Locals, Import, ImportArgs, VariableArgs, ModuleArgs, OutputArgs } from './blocks';
import { BlockArgs, Util } from './utils';

/**
 * @category TerraformGenerator
 */
export interface WriteOptions {
  /**
   * Directory to write to.
   *
   * Default = .
   */
  dir?: string;
  /**
   * Terraform filename, must ends with .tf.
   *
   * Default = terraform.tf
   */
  tfFilename?: string;
  /**
   * Terraform variables filename, must ends with .tfvars.
   *
   * Default = terraform.tfvars
   */
  tfvarsFilename?: string;
  /**
   * Put `true` to use `terraform fmt` to format the configuration, Terraform must be installed.
   *
   * If the terraform binary is named differently in your machine, put the binary name instead.
   *
   * Default = false
   */
  format?: boolean | string;
}

/**
 * @category TerraformGenerator
 */
export class TerraformGenerator {

  readonly #arguments?: BlockArgs;
  readonly #blocks: Block[] = [];
  #variables: BlockArgs = {};

  /**
   * Construct Terraform generator.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param args arguments
   */
  constructor(args?: BlockArgs) {
    this.#arguments = args;
  }

  /**
   * Generate Terraform configuration as string.
   */
  generate(): { tf: string; tfvars?: string } {
    return {
      tf: this.#generateTf(),
      tfvars: Object.keys(this.#variables).length > 0 ? this.#generateTfvars() : undefined
    };
  }

  #generateTf(): string {
    let str = '';

    if (this.#arguments || this.#blocks.filter(block => block.isInsideTerraformBlock()).length > 0) {
      str += 'terraform {\n';
      str += Util.argumentsToString(this.#arguments);
      this.#blocks.forEach(block => {
        if (block.isInsideTerraformBlock()) {
          str += block.toTerraform();
        }
      });
      str += '}\n\n';
    }

    this.#blocks.forEach(block => {
      if (!block.isInsideTerraformBlock()) {
        str += block.toTerraform();
      }
    });

    return Util.unescape(str);
  }

  #generateTfvars(): string {
    let str = '';

    Object.keys(this.#variables).forEach(key => {
      str += Util.argumentsToString({ [key]: this.#variables[key] });
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
  addBlocks(...blocks: Block[]): this {
    blocks.forEach(block => this.#blocks.push(block));
    return this;
  }

  /**
   * Add comment into Terraform.
   *
   * @param comment comment
   */
  comment(comment: string): Comment {
    const block = new Comment(comment);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add provider into Terraform.
   *
   * Refer to Terraform documentation on what can be put as type & arguments.
   *
   * @param type type
   * @param args arguments
   */
  provider(type: string, args: BlockArgs): Provider {
    const block = new Provider(type, args);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add resource into Terraform.
   *
   * Refer to Terraform documentation on what can be put as type & arguments.
   *
   * @param type type
   * @param name name
   * @param args arguments
   * @param provisioners provisioners
   */
  resource(type: string, name: string, args: BlockArgs, provisioners?: Provisioner[]): Resource {
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
  dataFromResource(resource: Resource, options: ResourceToDataOptions | undefined, argNames: (string | [string, string])[], args?: BlockArgs): Data {
    const block = resource.toData(options, argNames, args);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add data source into Terraform.
   *
   * Refer to Terraform documentation on what can be put as type & arguments.
   *
   * @param type type
   * @param name name
   * @param args arguments
   */
  data(type: string, name: string, args: BlockArgs): Data {
    const block = new Data(type, name, args);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add module into Terraform.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param name name
   * @param args arguments
   */
  module(name: string, args: ModuleArgs): Module {
    const block = new Module(name, args);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add output into Terraform.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param name name
   * @param args arguments
   */
  output(name: string, args: OutputArgs): Output {
    const block = new Output(name, args);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add locals into Terraform.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param args arguments
   */
  locals(args: BlockArgs): Locals {
    const block = new Locals(args);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add variable into Terraform.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param name name
   * @param args arguments
   * @param value variable value
   */
  variable(name: string, args: VariableArgs, value?: any): Variable {
    const block = new Variable(name, args);
    this.addBlocks(block);
    if (value != null) {
      this.addVars({ [name]: value });
    }
    return block;
  }

  /**
   * Add import into Terraform.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param args arguments
   */
  import(args: ImportArgs): Import {
    const block = new Import(args);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add backend into Terraform.
   *
   * Refer to Terraform documentation on what can be put as type & arguments.
   *
   * @param type type
   * @param args arguments
   */
  backend(type: string, args: BlockArgs): Backend {
    const block = new Backend(type, args);
    this.addBlocks(block);
    return block;
  }

  /**
   * Add variable values into Terraform.
   *
   * @param variables variables
   */
  addVars(variables: BlockArgs): this {
    this.#variables = {
      ...this.#variables,
      ...variables
    };
    return this;
  }

  /**
   * Merge this instance with other TerraformGenerator instances.
   *
   * @param tfgs other instances
   */
  merge(...tfgs: TerraformGenerator[]): this {
    tfgs.forEach(tfg => {
      this.addBlocks(...tfg.getBlocks());
      this.addVars(tfg.getVars());
    });
    return this;
  }

  /**
   * Get arguments.
   */
  getArguments(): BlockArgs | undefined {
    return this.#arguments;
  }

  /**
   * Get blocks.
   */
  getBlocks(): Block[] {
    return this.#blocks;
  }

  /**
   * Get variables.
   */
  getVars(): BlockArgs {
    return this.#variables;
  }

}
