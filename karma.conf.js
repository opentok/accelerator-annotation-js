module.exports = function(config) {

  var configuration = {
        plugins: [
           'karma-mocha', 'karma-coverage', 'karma-html2js-preprocessor', 'karma-chrome-launcher', 'karma-chai'
        ],
        basePath: '',
        frameworks: ['mocha', 'chai'],
        client: {
           contextFile: '/test/index.html'
        },
        files: [
          'https://static.opentok.com/v2/js/opentok.min.js',
          'https://code.jquery.com/jquery-1.10.2.js',
          'https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.8.3/underscore-min.js',
          'node_modules/chai/chai.js',
          'node_modules/opentok-solutions-logging/src/opentok-solutions-logging.js',
          'src/acc-pack-annotation.js',
          'src/annotation-widget.js',
          'test/components/accelerator-pack.js',
          'test/acc-pack-annotation-test.js'
        ],
        exclude: [
        ],
        preprocessors: {
            'test/*.html': ['html2js'],
            'src/*.js': ['coverage']
        },
        reporters: ['progress', 'coverage', 'dots'],
        port: 9877,
        colors: true,
        autoWatch: true,
        browsers: ['chrome', 'firefox'],
        singleRun: true,
        logLevel: config.LOG_INFO,
        coverageReporter: {
            dir: 'test/coverage',
            instrumenter: {
                'src/*.js': ['istanbul']
            },
            reporters: [
                { type: 'html', subdir: 'report-html' },
                { type: 'lcov', subdir: 'report-lcov' },
                { type: 'lcovonly', subdir: '.', file: 'report-lcovonly.txt' }
            ]
        },
        customLaunchers: {
         Chrome_travis_ci: {
           base: 'Chrome',
           flags: ['--no-sandbox']
         }
       }
    };

    if (process.env.TRAVIS) {
       configuration.browsers = ['Chrome_travis_ci'];
    }
    config.set(configuration);
  };
