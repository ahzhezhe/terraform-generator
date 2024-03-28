import fs from 'fs';
import path from 'path';
import { Map, map } from '../../src/arguments';
import { Resource } from '../../src/blocks';
import { TerraformGenerator } from '../../src/TerraformGenerator';

const project = 'test';

const configs = {
  env: 'dev',
  vpc: {
    cidr: '172.88.0.0/16'
  },
  tiers: [
    {
      name: 'public',
      cidr: '172.88.100.0/22',
      subnetCidrs: ['172.88.100.0/24', '172.88.101.0/24', '172.88.102.0/24']
    },
    {
      name: 'web',
      cidr: '172.88.104.0/22',
      subnetCidrs: ['172.88.104.0/24', '172.88.105.0/24', '172.88.106.0/24']
    },
    {
      name: 'app',
      cidr: '172.88.108.0/22',
      subnetCidrs: ['172.88.108.0/24', '172.88.109.0/24', '172.88.110.0/24']
    },
    {
      name: 'gut',
      cidr: '172.88.112.0/22',
      subnetCidrs: ['172.88.112.0/24', '172.88.113.0/24', '172.88.114.0/24']
    },
    {
      name: 'db',
      cidr: '172.88.116.0/22',
      subnetCidrs: ['172.88.116.0/24', '172.88.117.0/24', '172.88.118.0/24']
    }
  ]
};

const findTier = (name: string): { name: string; cidr: string; subnetCidrs: string[] } =>
  configs.tiers.filter(tier => tier.name === name)[0];

const getAvailabilityZone = (index: number): string => {
  switch (index) {
    case 0:
      return 'ap-southeast-1a';
    case 1:
      return 'ap-southeast-1b';
    case 2:
      return 'ap-southeast-1c';
    default:
      throw new Error(`Invalid availability zone ${index}`);
  }
};

const getTagName = (type: string, name?: string, tier?: string): string =>
  `${type}-${project}-${configs.env}${tier ? `-${tier}` : ''}${name ? `-${name}` : ''}`;

const getTags = (type: string, name?: string, tier?: string): Map => map({
  name: getTagName(type, name, tier),
  project,
  env: configs.env
});

const createTerraformGenerator = (): TerraformGenerator => {
  // Terraform
  const tfg = new TerraformGenerator({
    required_version: '= 0.12'
  });

  tfg.backend('s3', {
    bucket: 'mybucket',
    key: 'path/to/my/key',
    region: 'ap-southeast-1'
  });

  // Provider
  tfg.provider('aws', {
    region: 'ap-southeast-1',
    profile: 'test'
  });

  // VPC
  const vpc = tfg.resource('aws_vpc', 'vpc', {
    cidr_block: configs.vpc.cidr,
    tags: getTags('vpc')
  });

  // Subnets
  const publicSubnets: Resource[] = [];
  const webSubnets: Resource[] = [];
  const appSubnets: Resource[] = [];
  const gutSubnets: Resource[] = [];
  const dbSubnets: Resource[] = [];
  const itSubnets: Resource[] = [];
  const mgtSubnets: Resource[] = [];

  configs.tiers.forEach(tier => {
    for (let i = 0; i < tier.subnetCidrs.length; i++) {
      const name = `${tier.name}${i}`;
      const subnet = tfg.resource('aws_subnet', name, {
        vpc_id: vpc.id,
        cidr_block: tier.subnetCidrs[i],
        availability_zone: getAvailabilityZone(i),
        tags: getTags('subnet', name)
      });
      if (tier.name === 'public') {
        publicSubnets.push(subnet);
      } else if (tier.name === 'web') {
        webSubnets.push(subnet);
      } else if (tier.name === 'app') {
        appSubnets.push(subnet);
      } else if (tier.name === 'gut') {
        gutSubnets.push(subnet);
      } else if (tier.name === 'db') {
        dbSubnets.push(subnet);
      } else if (tier.name === 'it') {
        itSubnets.push(subnet);
      } else if (tier.name === 'mgt') {
        mgtSubnets.push(subnet);
      }
    }
  });

  // Internet gateway
  const igw = tfg.resource('aws_internet_gateway', 'igw', {
    vpc_id: vpc.id,
    tags: getTags('igw')
  });

  // Route tables
  const rtDefault = tfg.resource('aws_route_table', 'default', {
    vpc_id: vpc.id,
    tags: getTags('rt', 'default')
  });

  const rtIgw = tfg.resource('aws_route_table', 'igw', {
    vpc_id: vpc.id,
    route: [
      {
        cidr_block: '0.0.0.0/0',
        gateway_id: igw.id
      }
    ],
    tags: getTags('rt', 'igw')
  });

  webSubnets.concat(appSubnets, gutSubnets, dbSubnets, itSubnets).forEach(subnet => {
    tfg.resource('aws_route_table_association', `default-${subnet.name}`, {
      subnet_id: subnet.id,
      route_table_id: rtDefault.id
    });
  });

  publicSubnets.forEach(subnet => {
    tfg.resource('aws_route_table_association', `igw-${subnet.name}`, {
      subnet_id: subnet.id,
      route_table_id: rtIgw.id
    });
  });

  // NetworkACL
  const defaultNaclRules = [
    {
      protocol: 'all',
      rule_no: 100,
      action: 'allow',
      cidr_block: '0.0.0.0/0',
      from_port: 0,
      to_port: 0
    }
  ];

  const dbNaclRules = [
    {
      protocol: 'all',
      rule_no: 100,
      action: 'allow',
      cidr_block: findTier('app').cidr,
      from_port: 0,
      to_port: 0
    },
    {
      protocol: 'all',
      rule_no: 110,
      action: 'allow',
      cidr_block: findTier('db').cidr,
      from_port: 0,
      to_port: 0
    }
  ];

  tfg.resource('aws_network_acl', 'default', {
    vpc_id: vpc.id,
    subnet_ids: publicSubnets.concat(webSubnets, appSubnets, gutSubnets, itSubnets, mgtSubnets).map(subnet => subnet.id),
    ingress: defaultNaclRules,
    egress: defaultNaclRules,
    tags: getTags('nacl', 'default')
  });

  tfg.resource('aws_network_acl', 'db', {
    vpc_id: vpc.id,
    subnet_ids: dbSubnets.map(subnet => subnet.id),
    ingress: dbNaclRules,
    egress: dbNaclRules,
    tags: getTags('nacl', 'db')
  });

  // Tiers' security groups
  const sgEgress = {
    protocol: '-1',
    from_port: 0,
    to_port: 0,
    cidr_blocks: ['0.0.0.0/0']
  };

  configs.tiers.forEach(tier => {
    const sgIngress = {
      protocol: 'tcp',
      from_port: 22,
      to_port: 22,
      cidr_blocks: [tier.cidr],
      description: 'SSH for tier'
    };

    tfg.resource('aws_security_group', `${tier.name}-default`, {
      name: `fw-${tier.name}-default`,
      description: `Default for ${tier.name} tier`,
      vpc_id: vpc.id,
      ingress: sgIngress,
      egress: sgEgress,
      tags: getTags('sg', 'default', tier.name)
    });
  });

  // NAT Gateway
  const natEip = tfg.resource('aws_eip', 'nat', {
    vpc: true,
    tags: getTags('eip', 'nat')
  });

  const nat = tfg.resource('aws_nat_gateway', 'nat', {
    allocation_id: natEip.id,
    subnet_id: publicSubnets[0].id,
    tags: getTags('nat')
  });

  const rtNat = tfg.resource('aws_route_table', 'nat', {
    vpc_id: vpc.id,
    route: {
      cidr_block: '0.0.0.0/0',
      gateway_id: nat.id
    },
    tags: getTags('rt', 'nat')
  });

  gutSubnets.forEach(subnet => {
    tfg.resource('aws_route_table_association', `nat-${subnet.name}`, {
      subnet_id: subnet.id,
      route_table_id: rtNat.id
    });
  });

  // Output
  tfg.output('vpc', {
    value: map({
      cidr: vpc.attr('cidr_block')
    })
  });

  tfg.output('subnets', {
    value: map({
      publicSubnets: publicSubnets.map(subnet => subnet.attr('cidr_block')),
      webSubnets: webSubnets.map(subnet => subnet.attr('cidr_block')),
      appSubnets: appSubnets.map(subnet => subnet.attr('cidr_block')),
      gutSubnets: gutSubnets.map(subnet => subnet.attr('cidr_block')),
      mgtSubnets: mgtSubnets.map(subnet => subnet.attr('cidr_block')),
      dbSubnets: dbSubnets.map(subnet => subnet.attr('cidr_block'))
    })
  });

  return tfg;
};

const outputDir = path.join('test', '__output__');

test('Base', () => {
  const tfg = createTerraformGenerator();

  expect(tfg.getArguments()).toMatchSnapshot();
  expect(tfg.getBlocks()).toMatchSnapshot();
  expect(tfg.getVars()).toMatchSnapshot();
  expect(tfg.generate()).toMatchSnapshot();

  tfg.write({
    dir: outputDir,
    tfFilename: 'base',
    tfvarsFilename: 'base'
  });
  const tf = fs.readFileSync(path.join(outputDir, 'base.tf'), 'utf8');
  expect(tf).toMatchSnapshot();
});

