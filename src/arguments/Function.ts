import { Argument } from '..';

export default class Function extends Argument {

  constructor(fn: string, ...args: any) {
    super(Function.constructArgument(fn, ...args));
  }

  private static constructArgument(fn: string, ...args: (string | number | boolean | Argument)[]): string {
    if (!fn || !fn.trim()) {
      throw new Error('Function name cannot be empty.');
    }
    if (args.filter(arg => arg == null).length > 0) {
      throw new Error(`Invalid function argument: ${args}`);
    }

    let str = `${fn}(`;
    args.forEach((arg, i) => {
      if (arg instanceof Argument) {
        str += arg.toTerraform();
      } else {
        str += JSON.stringify(arg);
      }
      if (i < args.length - 1) {
        str += ', ';
      }
    });
    str += ')';
    return str;
  }

}
