// Generates a migration with sequelize-cli and a TypeScript model in this project's style.
// sequelize-cli can only write JavaScript models, so its model file is replaced.
//
// Usage: npm run generate:model -- <ModelName> <field:type> [field:type ...]

import { spawnSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import * as prettier from 'prettier';

const MODELS_DIR = path.resolve('src', 'db', 'models');

// sequelize-cli type -> TypeScript type, as returned by Postgres.
const TYPES = {
  string: 'string',
  text: 'string',
  char: 'string',
  citext: 'string',
  uuid: 'string',
  integer: 'number',
  smallint: 'number',
  float: 'number',
  double: 'number',
  real: 'number',
  // Postgres returns these as strings to avoid losing precision.
  bigint: 'string',
  decimal: 'string | number',
  boolean: 'boolean',
  date: 'Date',
  dateonly: 'string',
  json: 'unknown',
  jsonb: 'unknown',
};

function fail(message) {
  console.error(message);
  process.exit(1);
}

const [name, ...attributeArgs] = process.argv.slice(2);
const usage = 'Usage: npm run generate:model -- <ModelName> <field:type> [field:type ...]';

if (!name || attributeArgs.length === 0) {
  fail(usage);
}

if (!/^[A-Z][A-Za-z0-9]*$/.test(name)) {
  fail(`Model name must be PascalCase, e.g. MeatBundle. Got "${name}".\n${usage}`);
}

const attributes = attributeArgs
  .flatMap((arg) => arg.split(','))
  .filter(Boolean)
  .map((arg) => {
    const [field, type, ...rest] = arg.split(':');

    if (!field || !type || rest.length > 0) {
      fail(`Expected field:type, got "${arg}".\n${usage}`);
    }

    if (!(type.toLowerCase() in TYPES)) {
      fail(`Unsupported type "${type}". Supported: ${Object.keys(TYPES).join(', ')}.`);
    }

    return { field, type: type.toLowerCase() };
  });

const fileName = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
const modelPath = path.join(MODELS_DIR, `${fileName}.ts`);
const generatedJsPath = path.join(MODELS_DIR, `${name.toLowerCase()}.js`);

if (fs.existsSync(modelPath)) {
  fail(`${path.relative(process.cwd(), modelPath)} already exists.`);
}

const result = spawnSync(
  path.resolve('node_modules', '.bin', 'sequelize-cli'),
  [
    'model:generate',
    '--name',
    name,
    '--attributes',
    attributes.map((a) => `${a.field}:${a.type}`).join(','),
  ],
  { stdio: 'inherit' }
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}

fs.rmSync(generatedJsPath, { force: true });

const declares = attributes
  .map((a) => `  declare ${a.field}: CreationOptional<${TYPES[a.type]} | null>;`)
  .join('\n');
const columns = attributes
  .map((a) => `      ${a.field}: DataTypes.${a.type.toUpperCase()},`)
  .join('\n');

const source = `import {
  DataTypes,
  type CreationOptional,
  type InferAttributes,
  type InferCreationAttributes,
  type Sequelize,
} from 'sequelize';
import AppModel from './app-model';

export class ${name} extends AppModel<InferAttributes<${name}>, InferCreationAttributes<${name}>> {
  declare id: CreationOptional<number>;
${declares}
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

export default (sequelize: Sequelize) => {
  ${name}.init(
    {
      id: { type: DataTypes.INTEGER, allowNull: false, primaryKey: true, autoIncrement: true },
${columns}
      createdAt: { type: DataTypes.DATE, allowNull: false },
      updatedAt: { type: DataTypes.DATE, allowNull: false },
    },
    { sequelize, modelName: '${name}' }
  );

  return ${name};
};
`;

const prettierConfig = await prettier.resolveConfig(modelPath);
fs.writeFileSync(
  modelPath,
  await prettier.format(source, { ...prettierConfig, filepath: modelPath })
);

console.log(`
Replaced the JavaScript model with ${path.relative(process.cwd(), modelPath)}.

Next steps:
  1. Mark required fields: add \`allowNull: false\` (and \`validate: { notEmpty: true }\` for
     strings) in both the model and the migration, and drop \`CreationOptional<... | null>\`
     from their \`declare\` lines.
  2. Register the model in src/db/models/index.ts.
  3. Add a serializer in src/resources/ and a router in src/routes/ (see CLAUDE.md).
`);
