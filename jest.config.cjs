module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  testMatch: ["**/?(*.)+(spec|test).[jt]s?(x)"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/app/javascript/$1",
    "\\.(css|less|scss|sass)$": "<rootDir>/jest/styleMock.js",
    "\\.(gif|ttf|eot|svg|png|jpg|jpeg)$": "<rootDir>/jest/fileMock.js",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  coverageReporters: ["json-summary", "lcov", "text"],
  coverageDirectory: "coverage",
  coverageThreshold: {
    global: {
      branches: 25,
      functions: 25,
      lines: 25,
      statements: 25,
    },
  },
};
