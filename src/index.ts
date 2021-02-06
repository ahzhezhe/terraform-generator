export { TerraformGenerator, WriteOptions } from './TerraformGenerator';

export { Block } from './blocks/Block';
export { Provider } from './blocks/Provider';
export { Resource, ResourceToDataOptions } from './blocks/Resource';
export { Data } from './blocks/Data';
export { Output } from './blocks/Output';
export { Module } from './blocks/Module';
export { Locals } from './blocks/Locals';
export { Variable } from './blocks/Variable';
export { Backend } from './blocks/Backend';
export { Provisioner } from './blocks/Provisioner';

export { Argument, arg } from './arguments/Argument';
export { Attribute, attr } from './arguments/Attribute';
export { Function, fn } from './arguments/Function';
export { Heredoc, heredoc } from './arguments/Heredoc';

export { Map, map } from './types/Map';
export { List, list } from './types/List';
