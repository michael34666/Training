import { resolve } from 'path';
import { configDotenv } from 'dotenv';
import { defineConfig } from 'orval';

if (process.env.NODE_ENV !== 'production') {
  configDotenv({
    path: resolve(__dirname, './.env'),
  });
}

export default defineConfig({
  api: {
    input: {
      target: `${process.env.VITE_API_BASE_URL}/api-json`,
    },
    output: {
      target: './src/api/generated/generated.ts',
      schemas: './src/api/generated/model',
      client: 'react-query',
      override: {
        mutator: {
          path: './src/api/apiClient.ts',
          name: 'customInstance',
        },
      },
    },
  },
});
