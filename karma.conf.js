module.exports = function(config) {
  const webpackConfig = require('./webpack.config.js');
  const testFilePattern = ['src/**/*.spec.js'];

  config.set({
    basePath: '',
    frameworks: ['jasmine'],
    files: testFilePattern.map(function(item) { return { pattern: item, watched: true }; }),
    preprocessors: (function(){
      let output = {};
      testFilePattern.forEach(function(item) { output[item] = ['webpack']; });
      return output;
    })(),
    webpack: webpackConfig,
    reporters: ['progress'],
    port: 9876,
    colors: true,
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_WARN,
    autoWatch: true,
    browsers: ['PhantomJS'],
    phantomjsLauncher: { exitOnResourceError: true },
    singleRun: true,
    concurrency: Infinity
  });
}