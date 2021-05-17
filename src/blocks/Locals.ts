import { Block, Argument, Attribute } from '..';

/**
 * @category Block
 */
export class Locals extends Block {

  /**
   * Construct locals.
   *
   * Refer to Terraform documentation on what can be put as arguments.
   *
   * @param args arguments
   */
  constructor(args?: Record<string, any>) {
    super('locals', [], args);
  }

  asArgument(): Argument {
    throw new Error('Inaccessible method.');
  }

  attr(_name: string): Attribute {
    throw new Error('Inaccessible method.');
  }

  arg(name: string): Argument {
    return new Argument(`local.${name}`);
  }

}
