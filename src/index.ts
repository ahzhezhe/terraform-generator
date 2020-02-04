import { default as TerraformGenerator } from './TerraformGenerator';
export default TerraformGenerator;
export { TerraformVersion, TerraformGeneratorOptions } from './TerraformGenerator';

export { default as Block } from './blocks/Block';
export { default as Provider } from './blocks/Provider';
export { default as Resource } from './blocks/Resource';
export { default as DataSource } from './blocks/DataSource';
export { default as Output } from './blocks/Output';
export { default as Module } from './blocks/Module';
export { default as Variable } from './blocks/Variable';

export { default as Argument } from './arguments/Argument';
export { default as Attribute } from './arguments/Attribute';
export { default as Heredoc } from './arguments/Heredoc';

export { default as Map } from './types/Map';

export { writePlan } from './utils';
