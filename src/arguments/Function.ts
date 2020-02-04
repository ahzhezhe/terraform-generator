import { Argument } from '..';
import TerraformGeneratorUtils from '../TerraformGeneratorUtils';

export default class Function extends Argument {

  /**
   * Construct function argument.
   * 
   * @param fnName function name
   * @param args function arguments
   */
  constructor(fnName: string, ...args: any[]) {
    super(Function.constructArgument(fnName, ...args));
  }

  private static constructArgument(fn: string, ...args: any[]): string {
    if (!fn || !fn.trim()) {
      throw new Error('Function name cannot be empty.');
    }
    if (args.filter(arg => arg == null).length > 0) {
      throw new Error(`Invalid function argument: ${args}`);
    }

    let str = `${fn}(`;
    args.forEach((arg, i) => {
      str += TerraformGeneratorUtils.argumentValueToString(null, arg);
      if (i < args.length - 1) {
        str += ', ';
      }
    });
    str += ')';
    return str;
  }

}
