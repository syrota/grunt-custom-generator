# grunt-custom-generator

> Creates Grunt tasks for your own project generator

## Getting Started
This plugin requires Grunt `~0.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-custom-generator --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-custom-generator');
```

## The "generate" task

### Overview
In your project's Gruntfile, add a section named `generate` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  generate: {
    name: { // Provide custom generator name here
      files: [{
        src: '', // Path to template
        dest: '' // file to generate  
      }]
    }
  }
});
```

### Usage Examples

_(Nothing yet)_
