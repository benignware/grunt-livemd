'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.livemd = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(2);

    var actualMarkdown = grunt.file.read('tmp/default_options/README.md');
    var expectedMarkdown = grunt.file.read('test/expected/default_options/README.md');
    test.equal(actualMarkdown, expectedMarkdown, 'should generate markdown with runtime samples.');
    
    var actualHTML = grunt.file.read('tmp/default_options/README.html');
    var expectedHTML = grunt.file.read('test/expected/default_options/README.html');
    test.equal(actualHTML, expectedHTML, 'should generate html with runtime samples.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(1);

    var actualHTML = grunt.file.read('tmp/custom_options/README.html');
    var expectedHTML = grunt.file.read('test/expected/custom_options/README.html');
    test.equal(actualHTML, expectedHTML, 'should generate html with runtime samples.');

    test.done();
  },
  advanced_options: function(test) {
    test.expect(1);

    var actualHTML = grunt.file.read('tmp/advanced_options/README.html');
    var expectedHTML = grunt.file.read('test/expected/advanced_options/README.html');
    test.equal(actualHTML, expectedHTML, 'should generate html with runtime samples.');

    test.done();
  }
};
