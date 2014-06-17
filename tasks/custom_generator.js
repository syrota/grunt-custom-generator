/*
 * grunt-custom-generator
 * https://github.com/syrota/grunt-custom-generator
 *
 * Copyright (c) 2014 Eugene Syrota
 * Licensed under the MIT license.
 */

'use strict';

var changeCase = require('change-case');

var StringCase = function (str) {
    this.str = str;
};

StringCase.prototype = {
    pascalCase: function () {
        return changeCase.pascalCase(this.str.replace('-', ' '));
    },
    camelCase: function () {
        return changeCase.camelCase(this.str.replace('-', ' '));
    },
    toString: function () {
        return this.str;
    }
};



module.exports = function (grunt) {

    var contribConfigName = 'generate';

    function replaceDollarSignsWith (str, arr) {
        return arr.reduce(function (str, elem, i) {
            return str.replace('$' + i, elem);
        }, str);
    }

    function getContentFromTemplate (template, data) {
        if (!grunt.file.exists(template)) {
            grunt.fail.fatal('Cannot find template: ', template);
        }
        grunt.log.write('Reading template from', template, '');
        var content = grunt.template.process(grunt.file.read(template), { data : data });
        grunt.log.ok();
        return content;
    }

    function processFile (fileName, template, config, args) {

//        console.log(config.data || {}, ' -> ', template, ' -> ', fileName);
        if (grunt.file.exists(fileName)) {
            grunt.fail.warn('File ' + fileName + ' already exists');
        }

        if (template === '$empty') {
            grunt.file.write(fileName, '');
            return;
        }

        var data = config.data || {};
        args.forEach(function (arg, index) {
            data['$' + index] = new StringCase(arg);
        });

        var content = getContentFromTemplate(template, data);
        grunt.log.write('Creating file', fileName, '');
        grunt.file.write(fileName, content);
        grunt.log.ok();

    }

    function registerGruntTask (taskName) {

        grunt.registerTask(taskName, '', function () {

            var config = grunt.config.get(contribConfigName)[taskName],
                files = grunt.task.normalizeMultiTaskFiles(config),
                args = Array.prototype.slice.call(arguments);

//            console.log('config:');
//            console.log(config);
//            console.log('files:');
//            console.log(files);
//            console.log('args:');
//            console.log(args);

            if (!files.length) {
                grunt.fail.fatal('No files to process');
            }

            if (!args.length) {
                grunt.fail.fatal('Argument expected. Usage example: grunt '+taskName+':testname');
            }

            files.forEach(function (file) {
//                console.log('processing file:');
                var dest = replaceDollarSignsWith(file.dest, args);
//                console.log('  dest:', dest);

                if (file.src.length === 1) {
                    // template is specified
//                    console.log('  src:', file.src);
                    processFile(dest, file.src[0], config, args);
                } else if ((file.src.length === 0) && (file.orig.src.length === 1)) {
                    // template is '$empty' ?
//                    console.log('  src:', file.orig.src);
                    processFile(dest, file.orig.src[0], config, args);
                }
            });

        });

    }

    var config = grunt.config.get(contribConfigName);
    Object.keys(config).forEach(registerGruntTask);

};



