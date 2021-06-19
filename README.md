# **terraform-generator**

[![npm package](https://img.shields.io/npm/v/terraform-generator)](https://www.npmjs.com/package/terraform-generator)
[![npm downloads](https://img.shields.io/npm/dt/terraform-generator)](https://www.npmjs.com/package/terraform-generator)
[![GitHub test](https://github.com/ahzhezhe/terraform-generator/workflows/test/badge.svg?branch=master)](https://github.com/ahzhezhe/terraform-generator)
[![GitHub issues](https://img.shields.io/github/issues/ahzhezhe/terraform-generator)](https://github.com/ahzhezhe/terraform-generator/issues)
[![GitHub license](https://img.shields.io/github/license/ahzhezhe/terraform-generator)](https://github.com/ahzhezhe/terraform-generator/blob/master/LICENSE)

Use Node.js to generate Terraform configurations.

You do not need to have Terraform installed to use this module.

The end result of using this module is Terraform configurations in plain text, you will need to write the text  into a file (terraform-generator does provide an utility function to write the file for you) and execute it yourself.

Currently support generating configurations for Terraform version >= 0.12.

[API Documentation](https://ahzhezhe.github.io/docs/terraform-generator-v5/index.html)

## **Benefit**

Make use of all Javascript programming features (some of which is not available in Terraform), e.g. functions, array, loops, if-else, map, etc. to generate a plain Terraform configurations.

You can easily maintain your infra in Javascript/Typescript.

You don't need to use Terraform variables, you can use your own Javascript/JSON variables or use dotenv.

You don't need to use Terraform modules for reusable resource creations, you can make use of Javascript functions.

You can incorporate other Node.js libraries to facilitate your work.

## **Limitation**

The generated configurations are unformatted and its validity is not verified, use `terraform fmt` and `terraform plan` to format it and check its validity yourself.

## **Install via NPM**

```
npm install terraform-generator
```

## **Usage**

### **Import**
```javascript
import { TerraformGenerator, Resource, map, fn } from 'terraform-generator';
```
or
```javascript
const { TerraformGenerator, Resource, map, fn } = require('terraform-generator');
```

### **Initialize TerraformGenerator**
```javascript
const tfg = new TerraformGenerator({
  required_version: '>= 0.12'
});
```

### **Blocks**
Block's arguments are not typed, please refer to official Terraform documentation on what arguments can be supplied.

```javascript
tfg.provider('aws', {
  region: 'ap-southeast-1',
  profile: 'example'
});

const vpc = tfg.resource('aws_vpc', 'vpc', {
  cidr_block: '172.88.0.0/16'
});
```

### **Convert resource to data source**
```javascript
import { vpc as vpcDS } from 'other-terraform-generator-configuration';

const vpc = tfg.dataFromResource(vpcDS, null, ['cidr_block', ['tags', 'tag']]);
```

### **Arguments**
```javascript
{
  string: 'str',
  number: 123,
  boolean: true,
  stringList: ['str1', 'str2', 'str3'],
  numberList: [111, 222, 333],
  booleanList: [true, false, true],
  tuple: ['str', 123, true],
  object: {
    arg1: 'str',
    arg2: 123,
    arg3: true
  },
  objectList: [
    {
      arg1: 'str'
    },
    {
      arg1: 'str'
    }
  ],
  objectListForVariable: list(
    {
      arg1: 'str'
    },
    {
      arg1: 'str'
    }
  ),
  map: map({
    arg1: 'str',
    arg2: 123,
    arg3: true
  }),
  block: block,
  blockAttribute: block.attr('attrName'),
  heredoc: heredoc(`line1
                        line2
                        line3`),
  heredocJson: heredoc({
    arg1: 'str',
    arg2: 123,
    arg3: true
  }),
  function1: fn('max', 5, 12, 19),
  function2: fn('sort', 'a', block.attr('attrName'), 'c'),
  functionElement: fn('tolist', ['a', 'b', 'c']).element(0),
  custom: arg('max(5, 12, 9)'),
  interpolation: `str-${block.attr('attrName')}`
}
```

### **Attributes**
```javascript
block.attr('id')                                      // block id, string
block.id                                              // convenience getter function, same as attr('id')
block.attr('subnets')                                 // subnet objects, object list
block.attr('subnets.*.id')                            // subnet ids, string list
block.attr('subnets').attr('*').attr('id')            // same as above
block.attr('subnets.*.id[0]')                         // first subnet id, string
block.attr('subnets').attr('*').attr('id').element(0) // same as above
```

### **Variables**
```javascript
// You can directly add multiple variable values.
tfg.addVars({
  var1: 123,
  var2: 'abc'
});

// You can also add single variable value while adding variable block to your configuration.
tfg.variable('password', {
  type: 'string'
}, 'p@ssW0rd');
```

### **Merge multiple configurations**
```javascript
// You can split your configuration into multiple files and merge them before you generate the final outcome.
tfg.merge(tfg2, tfg3);
```

### **Generate Terraform configuration**
```javascript
// Generate Terraform configuration as string
const result = tfg.generate();
console.log(result.tf);
console.log(result.tfvars);

// Write Terraform configuration to a file
tfg.write({
  dir: 'outputDir',
  format: true
});
```

## **Example**
```javascript
import TerraformGenerator, { Map, map } from 'terraform-generator';
import path from 'path';

// Constants
const project = 'example';

// Environment variables
const configs = {
  env: 'dev',
  tiers: [
    {
      name: 'web',
      cidr: '172.88.100.0/22',
      subnetCidrs: ['172.88.100.0/24', '172.88.101.0/24', '172.88.102.0/24']
    },
    {
      name: 'app',
      cidr: '172.88.104.0/22',
      subnetCidrs: ['172.88.104.0/24', '172.88.105.0/24', '172.88.106.0/24']
    },
    {
      name: 'db',
      cidr: '172.88.108.0/22',
      subnetCidrs: ['172.88.108.0/24', '172.88.109.0/24', '172.88.110.0/24']
    }
  ]
};

// Utility functions
const getAvailabilityZone = (i: number): string => {
  if (i === 0) {
    return 'ap-southeast-1a';
  } else if (i === 1) {
    return 'ap-southeast-1b';
  } else {
    return 'ap-southeast-1c';
  }
};

const getTagName = (type: string, name?: string): string =>
  `${type}-${project}-${configs.env}${name ? `-${name}` : ''}`;

const getTags = (type: string, name?: string): Map => new Map({
  Name: getTagName(type, name),
  Project: project,
  Env: configs.env
});

// Start writing Terraform configuration
const tfg = new TerraformGenerator();

// Configure provider
tfg.provider('aws', {
  region: 'ap-southeast-1',
  profile: 'example'
});

// Find VPC by name
const vpc = tfg.data('aws_vpc', 'vpc', {
  filter: [{
    name: 'tag:Name',
    values: [getTagName('vpc')]
  }]
});

const subnets = {
  web: [],
  app: [],
  db: []
};

// Create 3-tiers, each tier has 3 subnets spread across availabilty zones
configs.tiers.forEach(tier => {
  tier.subnetCidrs.forEach((cidr, i) => {
    const name = `${tier.name}${i}`;
    const subnet = tfg.resource('aws_subnet', `subnet_${name}`, {
      vpc_id: vpc.id,
      cidr_block: cidr,
      availability_zone: getAvailabilityZone(i),
      tags: getTags('subnet', name)
    });
    subnets[tier.name].push(subnet);
  });
});

// Output all subnet ids
tfg.output('subnets', {
  value: map({
    webSubnets: subnets.web.map(subnet => subnet.id),
    appSubnets: subnets.app.map(subnet => subnet.id),
    dbSubnets: subnets.db.map(subnet => subnet.id)
  })
});

// Write the configuration into a terraform.tf file
const outputDir = path.join('output', configs.env, 'subnets');
tfg.write({ dir: outputDir, format: true });
```
