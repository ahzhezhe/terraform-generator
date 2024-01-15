import { Argument, Attribute, Map } from '../arguments';
import { Util } from '../utils';
import { Block } from '.';

interface ProvisionerArgs {
  when?: Argument<'create' | 'destroy'>;
  on_failure?: Argument<'continue' | 'fail'>;
}

/**
 * @category Block
 */
export interface FileProvisionerArgs extends ProvisionerArgs {
  source?: string;
  content?: string;
  destination?: string;
}

/**
 * @category Block
 */
export interface LocalExecProvisionerArgs extends ProvisionerArgs {
  command: string;
  working_dir?: string;
  interpreter?: string[];
  environment?: Map;
  quiet?: boolean;
}

/**
 * @category Block
 */
export interface RemoteExecProvisionerArgs extends ProvisionerArgs {
  inline?: string[];
  script?: string;
  scripts?: string[];
}

/**
 * @category Block
 */
export class Provisioner extends Block<FileProvisionerArgs | LocalExecProvisionerArgs | RemoteExecProvisionerArgs> {

  readonly type: 'file' | 'local-exec' | 'remote-exec';

  /**
   * Construct provisioner.
   *
   * Refer to Terraform documentation on what can be put as type & arguments.
   *
   * @param type type
   * @param args arguments
   */
  constructor(type: 'file', args: FileProvisionerArgs);
  constructor(type: 'local-exec', args: LocalExecProvisionerArgs);
  constructor(type: 'remote-exec', args: RemoteExecProvisionerArgs);
  constructor(type: 'file' | 'local-exec' | 'remote-exec', args: FileProvisionerArgs | LocalExecProvisionerArgs | RemoteExecProvisionerArgs) {
    super('provisioner', [type], args);

    this.type = type;
  }

  override asArgument(): Argument {
    throw Util.inaccessibleMethod();
  }

  override attr(_name: string): Attribute {
    throw Util.inaccessibleMethod();
  }

}
