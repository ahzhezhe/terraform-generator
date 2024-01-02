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
  Output, OutputArgs,
  Provider,
  Provisioner, ProvisionerArgs, ProvisionerType,
  RequiredProviders, RequiredProvidersArgs,
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
