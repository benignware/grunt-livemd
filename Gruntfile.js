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
        options: {
        },
        files: {
          'tmp/default_options/README.md': ['test/fixtures/README.md'],
          'tmp/default_options/README.html': ['test/fixtures/README.md']
        }
      },
      custom_options: {
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
        options: {
          prefilter: function(string) {
            return string.replace(grunt.config().pkg && grunt.config().pkg.homepage && new RegExp("\\[.*\\]\\(" + grunt.config().pkg.homepage.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "\\)", "gi"), "");
          }
        },
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
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'livemd', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);
  
  grunt.registerTask('site', ['livemd:site']);

};
