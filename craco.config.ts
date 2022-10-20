import path from 'path';
module.exports = {
  jest: {
    configure: {
      preset: 'ts-jest',
      modulePaths: ['<rootDir>/'],
      rootDir: './',
      globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/tsconfig.json',
        },
      },
      transform: {
        '^.+\\.[t|j]sx?$': 'ts-jest',
      },
      setupFilesAfterEnv: ['<rootDir>/src/tests/setupTests.ts'],
      moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
      moduleNameMapper: {
        '^@/(.+)$': '<rootDir>/src/$1',
        // workaround for axios 1.X.X version
        // see this issue: https://github.com/axios/axios/issues/5026
        '^axios$': require.resolve('axios'),
      },
    },
  },
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};
