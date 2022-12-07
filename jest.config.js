const esModules = ['@angular', '@ngrx', 'rxjs'];

module.exports = {
  globalSetup: 'jest-preset-angular/global-setup',
  cacheDirectory: "<rootDir>/jest/cache",
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "<rootDir>/jest/report",
  globals: {
    "ts-jest": {
      tsconfig: "<rootDir>/tsconfig.spec.json",
    }
  },
  moduleFileExtensions: ["ts", "js", "json"],
  transformIgnorePatterns: [`<rootDir>/node_modules/(?!.*\\.mjs$|${esModules.join('|')})`],
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  "transform": {
    "^.+\\.(ts|js|html)$": "jest-preset-angular"
  },
  verbose: true
}
