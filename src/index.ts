export { TerraformElement, TerraformArgs } from './utils';

export { TerraformGenerator, WriteOptions } from './TerraformGenerator';

export {
  Block,
  Backend,
  Comment,
  Data,
  Import, ImportArgs,
  Locals,
  Module, ModuleArgs,
  Moved, MovedArgs,
  Output, OutputArgs,
  Provider,
  Provisioner, FileProvisionerArgs, LocalExecProvisionerArgs, RemoteExecProvisionerArgs,
  Removed, RemovedArgs,
  Resource, ResourceToDataOptions,
  Variable, VariableArgs
} from './blocks';

export {
  Argument, arg,
  Attribute, attr,
  Function, fn,
  Heredoc, heredoc,
  List, list,
  Map, map
} from './arguments';
