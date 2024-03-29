import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'src/graphql/schema.graphql',
  generates: {
    'src/graphql/': {
      preset: 'client',
      plugins: [],
    },
  },
};

export default config;
