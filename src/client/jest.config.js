module.exports = {
  cacheDirectory: "../../node_modules/.cache/jest",
  moduleNameMapper: {
    "\\.s?css$": "identity-obj-proxy",
    "\\.(jpg|png|gif|svg|woff|mp4)$": "<rootDir>/../../__mocks__/fileMock.js",
  },
  setupFiles: [],
  setupFilesAfterEnv: ["<rootDir>/lib/enzyme.ts"],
  snapshotSerializers: ["<rootDir>/../../node_modules/enzyme-to-json/serializer"],
  testEnvironment: "jsdom",
  testURL: "https://test.fpwc.io",
  testRegex: "/__tests__/.*\\.(js|ts)x?$",
  moduleFileExtensions: ["js", "json", "ts", "tsx", "d.ts"],
  modulePaths: ["<rootDir>"],
  transform: {
    "^.+\\.(js|ts|tsx)$": "babel-jest",
  }
};
