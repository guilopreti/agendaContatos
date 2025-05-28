import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/tests/**/*.test.ts"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  moduleNameMapper: {
    "@application/(.*)$": "<rootDir>/src/application/$1",
    "@domain/(.*)$": "<rootDir>/src/domain/$1",
    "@infrastructure/(.*)$": "<rootDir>/src/infrastructure/$1",
    "@presentation/(.*)$": "<rootDir>/src/presentation/$1",
  },
};

export default config;
