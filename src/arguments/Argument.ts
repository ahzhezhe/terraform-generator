export default class Argument {

  readonly args: (string | Argument)[];

  constructor(...args: (string | Argument)[]) {
    this.args = args;
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
