module.exports = function(config) {
    config.set({
      basePath: '',
      frameworks: ['jasmine'],
      files: [
        'src/**/*.ts',
      ],
      preprocessors: {
        '**/*.ts': ['karma-typescript'],
      },
      reporters: ['progress', 'coverage'],
      browsers: ['ChromeHeadless'],
      singleRun: true,
      customLaunchers: {
        ChromeHeadlessWithLocation: {
          base: 'ChromeHeadless',
          flags: [
            '--no-sandbox',
            '--headless',
            '--use-fake-ui-for-media-stream',
            '--remote-debugging-port=9222',
          ],
        },
      },
      plugins: [
        'karma-chrome-launcher',
        'karma-jasmine',
        'karma-coverage',
        'karma-typescript',
      ],
    });
  };
  