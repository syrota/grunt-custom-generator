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

exports.custom_generator = {
    setUp: function (done) {

        // Actually load this plugin's task(s).

//        grunt.loadTasks('tasks');

        // setup here if necessary
        done();
    },
    simple: function (test) {


        console.log('run...');
        var config = grunt.file.readJSON("test/simple/config.json");

        var expected = Object.keys(config.expected);
        test.expect(expected.length * 2);

        expected.forEach(function (filename) {
            test.ok(grunt.file.exists(filename), 'file ' + filename + 'must exists');
            test.equal(grunt.file.read(filename), config.expected[filename], 'file contents should be equal');
        });

        test.done();
    }
};
