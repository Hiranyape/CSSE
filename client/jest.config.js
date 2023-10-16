// jest.config.js
module.exports = {
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.js$': 'babel-jest',
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
    transformIgnorePatterns: [
      '/node_modules/(?!axios)', // Exclude axios from transformation
    ],
    moduleNameMapper: {
      "\\.(css|less|scss)$": "identity-obj-proxy",
    },
  };
  