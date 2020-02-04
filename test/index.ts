import { Resource, Attribute, Map, Argument, Heredoc, Function } from '../src';

export const resource = new Resource('type', 'name', { test: true });

export const attr = new Attribute(resource, 'attr');

export const arg1 = {
  arg0: 'a',
  arg1: ['b', 'c', 'd'],
  arg2: 0,
  arg3: [1, 2, 3],
  arg4: true,
  arg5: [false, true, false],
  arg6: attr,
  arg7: [attr, attr, attr],
  arg8: resource,
  arg9: [resource, resource, resource],
  arg10: ['e', 4, true, attr, resource],
  arg11: new Argument('arg'),
  arg12: new Argument(attr),
  arg13: new Argument('as is', true),
  arg14: new Heredoc('heredoc'),
  arg15: new Function('fn', 1, 2, 3),
  arg16: new Function('fn', attr, attr, attr)
};

export const arg2 = {
  ...arg1,
  arg100: arg1
};

export const arg3 = {
  ...arg2,
  arg101: [arg2, arg2, arg2]
};

export const arg4 = {
  ...arg3,
  arg102: new Map(arg3)
};
