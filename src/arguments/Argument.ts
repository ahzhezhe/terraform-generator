export default class Argument {

  readonly args: (string | Argument)[];
  readonly asIs: boolean = false;

  constructor(...args: (boolean | string | Argument)[]) {
    if (args.length > 0 && typeof args[0] === 'boolean') {
      this.asIs = args[0] as boolean;
      args.splice(0, 1);
    }
    if (args.length < 1) {
      throw new Error('Argument cannot be empty.');
    }
    if (args.filter(arg => typeof arg === 'boolean').length > 0) {
      throw new Error(`Invalid argument: ${args}`);
    }
    this.args = args as (string | Argument)[];
  }

  toTerraform(): string {
    let str = '';
    this.args.forEach(arg => {
      if (arg instanceof Argument) {
        str += arg.toTerraform();
      } else {
        str += arg;
      }
    });
    return str;
  }

}
