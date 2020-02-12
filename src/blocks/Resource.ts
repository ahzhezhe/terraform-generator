import { Block, Argument, Attribute, DataSource, Map } from '..';

interface ToDataSourceArgNameMap {
  name: string;
  newName: string
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
   * Convert resource into data source. Data source will have the same name as resource.
   * 
   * @param argNames names of resource arguments to converted into data source arguments
   * @param args extra arguments
   */
  toDataSource(argNames: (string | ToDataSourceArgNameMap)[], args?: object): DataSource;

  /**
   * Convert resource into data source.
   * 
   * @param newName new name of the data source
   * @param argNames names of resource arguments to converted into data source arguments
   * @param args extra arguments
   */
  toDataSource(newName: string, argNames: (string | ToDataSourceArgNameMap)[], args?: object): DataSource;

  toDataSource(arg1: (string | ToDataSourceArgNameMap)[] | string, arg2?: object | (string | ToDataSourceArgNameMap)[], arg3?: object): DataSource {
    let newName = this.name;
    let argNames: (string | ToDataSourceArgNameMap)[];
    let args: object;

    if (typeof arg1 === 'string') {
      newName = arg1;
      argNames = arg2 as (string | ToDataSourceArgNameMap)[];
      args = arg3;
    } else {
      argNames = arg1;
      args = arg2;
    }

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

    return new DataSource(this.type, newName, args);
  }

}
