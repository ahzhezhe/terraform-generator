import { Utils } from '../../src';
import fs from 'fs';
import path from 'path';

const dir = path.join('test', '__output__');

test('writePlan', () => {
  Utils.writePlan('111', dir);

  const plan = fs.readFileSync(path.join(dir, 'terraform.tf'), 'utf8');
  expect(plan).toBe('111');

  fs.unlinkSync(path.join(dir, 'terraform.tf'));
});

test('writePlan custom name', () => {
  Utils.writePlan('222', dir, { filename: 'custom' });

  const plan = fs.readFileSync(path.join(dir, 'custom.tf'), 'utf8');
  expect(plan).toBe('222');

  fs.unlinkSync(path.join(dir, 'custom.tf'));
});

afterAll(() => {
  fs.rmdirSync(dir);
});
