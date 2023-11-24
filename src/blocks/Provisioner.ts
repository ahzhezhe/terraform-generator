import { Argument, Attribute } from '../arguments';
import { Block } from '.';

/**
 * @category Block
 */
export type ProvisionerType = 'local-exec' | 'remote-exec';

/**
 * @category Block
 */
export interface ProvisionerArgs {
  command: string;
  when?: Argument<'destroy'>;
  on_failure?: Argument<'continue' | 'fail'>;
}

/**
 * @category Block
 */
export class Provisioner extends Block<ProvisionerArgs> {

  readonly type: ProvisionerType;

  /**
   * Construct provisioner.
   *
   * Refer to Terraform documentation on what can be put as type & arguments.
   *
   * @param type type
   * @param args arguments
   */
  constructor(type: ProvisionerType, args: ProvisionerArgs) {
    super('provisioner', [type], args);

    this.type = type;
  }

  override asArgument(): Argument {
    throw new Error('Inaccessible method.');
  }

  override attr(_name: string): Attribute {
    throw new Error('Inaccessible method.');
  }

}
