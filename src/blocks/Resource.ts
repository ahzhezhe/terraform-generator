import { Block, Argument, Attribute, DataSource, Map } from '..';

/**
 * Options to convert resource into data source.
 * 
 * @param type new type of the data source
 * @param name new name of the data source
 * 
 */
export interface ResourceToDataSourceOptions {
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

  getAttribute(name: string): Attribute {
    return new Attribute(this, name);
  }

  /**
   * Convert resource into data source.
   * Refer to Terraform documentation on what can be put as arguments.
   * 
   * @param options options
   * @param argNames names of resource arguments to converted into data source arguments
   * @param args extra arguments
   */
  toDataSource(options: ResourceToDataSourceOptions, argNames: (string | { name: string; newName: string })[], args?: object): DataSource {
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
        actualArgName = argName.name;
        newArgName = argName.newName;
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

    return new DataSource(type, name, args);
  }

}
