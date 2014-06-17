/*
 * grunt-custom-generator
 * https://github.com/syrota/grunt-custom-generator
 *
 * Copyright (c) 2014 Eugene Syrota
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
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

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js']
        }

    });


    var config = grunt.file.readJSON("test/simple/config.json");
    grunt.config.merge(config.config);
    grunt.registerTask('run-simple-task', function () {
        grunt.task.run(config.task);
    });



    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');

    // Whenever the "test" task is run, first clean the "tmp" dir, then run this
    // plugin's task(s), then test the result.
    grunt.registerTask('test', ['clean', 'run-simple-task', 'nodeunit']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test']);

};
