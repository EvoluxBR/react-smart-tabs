const { defaults: tsjPreset } = require('ts-jest/presets');
module.exports = {
  ...tsjPreset,
  setupFiles: ['<rootDir>/test-shim.js', '<rootDir>/test-setup.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  collectCoverageFrom: ['src/**/*.{ts,tsx}'],
  transform: {
    ...tsjPreset.transform,
    '^.+\\.svg$': '<rootDir>/svgTransform.js',
  },
};
