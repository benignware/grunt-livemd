/*
 * grunt-livemd
 * https://github.com/rafaelnowrotek/grunt-livemd
 *
 * Copyright (c) 2015 Rafael Nowrotek
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    livemd: {
      default_options: {
        // Override pkg version for tests
        options: {
          layout: {
            data: {
              pkg: {
                version: '0.0.0'
              }
            }
          }
        },
        // Setup test files
        files: {
          'tmp/default_options/README.md': ['test/fixtures/README.md'],
          'tmp/default_options/README.html': ['test/fixtures/README.md']
        }
      },
      custom_options: {
        // Use a custom layout
        options: {
          wrap: '<div class="live-example"></div>',
          layout: {
            template: 'test/fixtures/layout.html',
            data: {
              test: 'This example demonstrates how to use grunt-livemd with custom options'
            }
          },
          title: function(src) {
            return "Title of " + src;
          }
        },
        files: {
          'tmp/custom_options/README.html': ['test/fixtures/README.md']
        }
      },
      advanced_options: {
        // Use a prefilter
        options: {
          prefilter: function(string) {
            return string.replace(grunt.config().pkg && grunt.config().pkg.homepage && new RegExp("\\[.*\\]\\(" + grunt.config().pkg.homepage.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "\\)", "gi"), "");
          },
          // Override pkg version for tests
          layout: {
            data: {
              pkg: {
                version: '0.0.0'
              }
            }
          }
        },
        // Setup test files
        files: {
          'tmp/advanced_options/README.html': ['test/fixtures/README.md']
        }
      },
      site: {
        options: {
          paths: ['test/fixtures/'],
          prefilter: function(string) {
            var demo = grunt.file.read('test/fixtures/README.md');
            demo = demo.replace(/#\s*grunt-livemd\n\s*>.*\n/gi, "## Demo");
            demo = demo.replace(/>\s*grunt-livemd/gi, "## Demo");
            string = string.replace(grunt.config().pkg && grunt.config().pkg.homepage && new RegExp("\\[.*\\]\\(" + grunt.config().pkg.homepage.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "\\)", "i"), demo);
            string = string.replace(grunt.config().pkg && grunt.config().pkg.homepage && new RegExp("\\[.*\\]\\(" + grunt.config().pkg.homepage.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "\\)", "gi"), "");
            return string;
          }
        },
        files: {
          'site/index.html': ['README.md']
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },
    
    // Github Pages
    'gh-pages': {
      options: {
        // Options for all targets go here.
      },
      site: {
        options: {
          base: 'site'
        },
        // These files will get pushed to the `gh-pages` branch (the default).
        src: ['**/*']
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks("grunt-gh-pages");


  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'livemd', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
  
  grunt.registerTask('site', ['livemd:site']);

};
