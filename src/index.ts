import { default as TerraformGenerator } from './TerraformGenerator';
export default TerraformGenerator;
export { TerraformVersion, TerraformGeneratorOptions, WriteOptions } from './TerraformGenerator';

export { default as Block } from './blocks/Block';
export { default as Provider } from './blocks/Provider';
export { default as Resource, ResourceToDataSourceOptions } from './blocks/Resource';
export { default as DataSource } from './blocks/DataSource';
export { default as Output } from './blocks/Output';
export { default as Module } from './blocks/Module';
export { default as Variable } from './blocks/Variable';
export { default as Backend } from './blocks/Backend';

export { default as Argument, arg } from './arguments/Argument';
export { default as Attribute, attr } from './arguments/Attribute';
export { default as Heredoc, heredoc } from './arguments/Heredoc';
export { default as Function, fn } from './arguments/Function';

export { default as Map, map } from './types/Map';
