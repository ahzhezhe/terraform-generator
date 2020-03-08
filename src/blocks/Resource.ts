import { Block, Argument, Attribute, Data, Map } from '..';

/**
 * Options to convert resource into data source.
 * 
 * @param type new type of the data source
 * @param name new name of the data source
 * 
 */
export interface ResourceToDataOptions {
  type?: string;
  name?: string;
}

export default class Resource extends Block {

  readonly type: string;
  readonly name: string;

  /**
   * Construct resource.
   * Refer to Terraform documentation on what can be put as type & arguments.
   * 
   * @param type type
   * @param name name
   * @param args arguments
   */
  constructor(type: string, name: string, args?: object) {
    super('resource', [type, name], args);

    this.type = type;
    this.name = name;
  }

  asArgument(): Argument {
    return new Argument(`${this.type}.${this.name}`);
  }

  attr(name: string): Attribute {
    return new Attribute(this, name);
  }

  /**
   * Convert resource into data source.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param options options
   * @param argNames names of resource arguments to converted into data source arguments;
   * use array for name mapping, position 0 = original resource's argument name, position 1 = mapped data source's argument name
   * @param args extra arguments
   */
  toData(options: ResourceToDataOptions, argNames: (string | [string, string])[], args?: object): Data {
    const type = (options && options.type) ? options.type : this.type;
    const name = (options && options.name) ? options.name : this.name;

    if (!args) {
      args = {};
    }
    if (!args['filter']) {
      args['filter'] = [];
    } else if (!Array.isArray(args['filter'])) {
      throw new Error('Filter is not an array.');
    }

    for (const argName of argNames) {
      let actualArgName: string;
      let newArgName: string;
      if (typeof argName === 'string') {
        actualArgName = argName;
        newArgName = argName;
      } else {
        actualArgName = argName[0];
        newArgName = argName[1];
      }

      const arg = this.getArgument(actualArgName);
      if (arg instanceof Map) {
        for (const mapArgName in arg.args) {
          args['filter'].push({
            name: `${newArgName}:${mapArgName}`,
            values: [arg.args[mapArgName]]
          });
        }
      } else if (!args[newArgName]) {
        args[newArgName] = arg;
      }
    }

    return new Data(type, name, args);
  }

}
