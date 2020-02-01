import TerraformGenerator, { Resource, Attribute, Map } from '../..';

export const tfGenerator11 = new TerraformGenerator({ version: '0.11' });

export const tfGenerator12 = new TerraformGenerator({ version: '0.12' });

export const resource = (tfGenerator: TerraformGenerator): Resource => new Resource(tfGenerator, 'type', 'name', { test: true });

export const attr = (tfGenerator: TerraformGenerator): Attribute => new Attribute(resource(tfGenerator), 'attr');

export const arg1 = (tfGenerator: TerraformGenerator): object => ({
  arg0: 'a',
  arg1: ['b', 'c', 'd'],
  arg2: 0,
  arg3: [1, 2, 3],
  arg4: true,
  arg5: [false, true, false],
  arg6: attr(tfGenerator),
  arg7: [attr(tfGenerator), attr(tfGenerator), attr(tfGenerator)],
  arg8: resource(tfGenerator),
  arg9: [resource(tfGenerator), resource(tfGenerator), resource(tfGenerator)],
  arg10: ['e', 4, true, attr(tfGenerator), resource(tfGenerator)]
});

export const arg2 = (tfGenerator: TerraformGenerator): object => ({
  ...arg1(tfGenerator),
  arg11: arg1(tfGenerator)
});

export const arg3 = (tfGenerator: TerraformGenerator): object => ({
  ...arg2(tfGenerator),
  arg12: [arg2(tfGenerator), arg2(tfGenerator), arg2(tfGenerator)]
});

export const arg4 = (tfGenerator: TerraformGenerator): object => ({
  ...arg3(tfGenerator),
  arg12: new Map(arg3(tfGenerator))
});
