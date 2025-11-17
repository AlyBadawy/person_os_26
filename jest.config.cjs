module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  coverageReporters: ["json-summary", "lcov", "text"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 95,
      functions: 95,
      lines: 95,
      statements: 95,
    },
  },
};
