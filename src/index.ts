export { BlockArgs } from './utils';

export { TerraformGenerator, WriteOptions } from './TerraformGenerator';

export {
  Block,
  Backend,
  Comment,
  Data,
  Import, ImportArgs,
  Locals,
  Module, ModuleArgs,
  Output, OutputArgs,
  Provider,
  Provisioner, ProvisionerArgs, ProvisionerType,
  Resource, ResourceToDataOptions,
  Variable, VariableArgs
} from './blocks';

export {
  Argument, arg,
  Attribute, attr,
  Function, fn,
  Heredoc, heredoc
} from './arguments';

export {
  List, list,
  Map, map
} from './types';
