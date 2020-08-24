
import fs from 'fs';
import path from 'path';
import TerraformGenerator, { map, Provisioner, arg } from '../../src';

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

  tfg.dataFromResource(r, null, ['cidr_block', ['tags', 'tag']]);
  tfg.dataFromResource(r, { name: 'test2' }, ['cidr_block', ['tags', 'tag']]);

  tfg.resource('innerBlock', 'innerBlock', {
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

  tfg.provisioner('provisioner', {
    a: 'a',
    b: 123,
    c: r.attr('x')
  });

  tfg.resource('tags', 'tags', {
    tags: map({
      'a': 'a',
      'b c d': 'b c d'
    })
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

  tfg.write({ dir: outputDir });
  const tf = fs.readFileSync(path.join(outputDir, 'terraform.tf'), 'utf8');
  expect(tf).toMatchSnapshot();
  const tfvars = fs.readFileSync(path.join(outputDir, 'terraform.tfvars'), 'utf8');
  expect(tfvars).toMatchSnapshot();
});

afterAll(() => {
  fs.unlinkSync(path.join(outputDir, 'terraform.tf'));
  fs.unlinkSync(path.join(outputDir, 'terraform.tfvars'));
  fs.rmdirSync(outputDir);
});
