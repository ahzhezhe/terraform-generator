import { default as TerraformGenerator } from './src/TerraformGenerator';
export default TerraformGenerator;
export { TerraformVersion, TerraformGeneratorOptions } from './src/TerraformGenerator';

export { default as Block } from './src/blocks/Block';
export { default as Provider } from './src/blocks/Provider';
export { default as Resource } from './src/blocks/Resource';
export { default as DataSource } from './src/blocks/DataSource';
export { default as Output } from './src/blocks/Output';
export { default as Module } from './src/blocks/Module';
export { default as Variable } from './src/blocks/Variable';

export { default as Identifier } from './src/identifiers/Identifier';
export { default as Attribute } from './src/identifiers/Attribute';

export { default as Map } from './src/types/Map';
