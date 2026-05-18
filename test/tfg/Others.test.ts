import fs from 'fs';
import path from 'path';
import { Argument, arg, map } from '../../src/arguments';
import { Provisioner } from '../../src/blocks';
import { TerraformGenerator } from '../../src/TerraformGenerator';

const createTerraformGenerator = (): TerraformGenerator => {
  const tfg = new TerraformGenerator();

  tfg.variable('test', {
    type: arg('string')
  });

  tfg.variable('test2', {
    type: arg('string')
  }, 'test');

  tfg.data('aws_vpc', 'test', {
    cidr_block: 'test'
  });

  tfg.module('test', {
    source: './test'
  });

  const r = tfg.resource('aws_vpc', 'test', {
    cidr_block: 'test',
    tags: map({
      a: 'a'
    })
  });

  tfg.dataFromResource(r, undefined, ['cidr_block', ['tags', 'tag']]);
  tfg.dataFromResource(r, { name: 'test2' }, ['cidr_block', ['tags', 'tag']]);

  const resource = tfg.resource('innerBlock', 'innerBlock', {
    a: 'a'
  }, [
    new Provisioner('local-exec', {
      command: 'echo hello'
    }),
    new Provisioner('local-exec', {
      command: 'echo world'
    })
  ]);

  const locals = tfg.locals({
    a: 'a',
    b: 123,
    c: r.attr('x')
  });
  tfg.resource('locals', 'locals', {
    a: locals.arg('a')
  });

  tfg.import({
    to: resource,
    id: 'id',
    provider: arg('arg')
  });

  tfg.resource('tags', 'tags', {
    tags: map({
      'a': 'a',
      'b': 'b c d'
    })
  });

  tfg.comment('comment');

  tfg.comment(`
    line1
    line2
    line3
    line4
  `);

  tfg.moved({
    from: new Argument('resource.a'),
    to: resource
  });

  tfg.removed({
    from: new Argument('resource.b'),
    lifecycle: {
      destroy: false
    }
  });

  const tfg2 = new TerraformGenerator();
  tfg2.resource('tfg2', 'tfg2', {
    tfg2: 'tfg2'
  });

  tfg.merge(tfg2);

  return tfg;
};

const outputDir = path.join('test', '__output__');

test('Others', () => {
  const tfg = createTerraformGenerator();

  expect(tfg.getArguments()).toMatchSnapshot();
  expect(tfg.getBlocks()).toMatchSnapshot();
  expect(tfg.getVars()).toMatchSnapshot();
  expect(tfg.generate()).toMatchSnapshot();

  tfg.write({
    dir: outputDir,
    tfFilename: 'others',
    tfvarsFilename: 'others'
  });
  const tf = fs.readFileSync(path.join(outputDir, 'others.tf'), 'utf8');
  expect(tf).toMatchSnapshot();
  const tfvars = fs.readFileSync(path.join(outputDir, 'others.tfvars'), 'utf8');
  expect(tfvars).toMatchSnapshot();
});
