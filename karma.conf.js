// Karma configuration file, see link for more information
// https://karma-runner.github.io/0.13/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular/cli'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-mocha-reporter'),
      require('@angular/cli/plugins/karma'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage-istanbul-reporter')
    ],
    mime: {
      'text/x-typescript': ['ts', 'tsx']
    },
    client:{
      clearContext: false // leave Jasmine Spec Runner output visible in browser
    },
    files: [
      {pattern: './src/tests/test.ts', watched: false}
    ],
    preprocessors: {
      './src/tests/test.ts': ['@angular/cli']
    },
    coverageIstanbulReporter: {
      reports: ['html', 'lcovonly'],
      fixWebpackSourcePaths: true
    },
    reporters: [
      'mocha', 'coverage-istanbul', 'kjhtml'
    ],
    port: 9876,
    colors: true,
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false,
    noResolve: false,
    browserNoActivityTimeout: 100000
  });
};
