import { Block, Argument, Attribute, DataSource, Map } from '..';

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
   * Convert resource into data source, filtered by resource's tags
   * 
   * @param name data source name, put null to use the same name as resource
   */
  toDataSourceByTags(name?: string): DataSource {
    if (!name) {
      name = this.name;
    }

    const tags = this.getArgument('tags');
    if (!tags) {
      throw new Error('Resource does not have tags.');
    }
    if (!(tags instanceof Map)) {
      throw new Error('Tags is not a Map.');
    }

    const filter = [];
    for (const tagName in tags.args) {
      filter.push({
        name: `tag:${tagName}`,
        values: [tags.args[tagName]]
      });
    }

    return new DataSource(this.type, name, { filter });
  }

}
