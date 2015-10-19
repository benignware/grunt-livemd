# grunt-livemd

> Generate live-samples from markdown files

With grunt-livemd you can easily generate runtime browser samples from corresponding code-blocks contained in markdown-files.

Supported languages:

* HTML
* CSS
* Javascript
* Coffeescript
* SCSS
* Less
* Haml

In addition to being a simple wrapper for [livemd](https://github.com/benignware/livemd), grunt-livemd also provides a preconfigured html-renderer.
When rendered to html, you could either specify a custom lodash-template or use the bundled default one which is designed to resemble github presentation.

[Demo](http://benignware.github.io/grunt-livemd)

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-livemd --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-livemd');
```

## The "livemd" task

### Overview
In your project's Gruntfile, add a section named `livemd` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  livemd: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.layout
Type: `String`
Default value: `'github'`

Path to a custom template or a string identifier specifying a bundled layout. Pass in an object containing a `template`- and `data`-property to use custom variables inside the template. By default the template has access to the package.json stored in a key `pkg`.

#### options.paths
Type: `Array`
Default value: `[]`

Provide an array of include paths to pass to scss and less modules. Path to source is included by default.

#### options.prefilter
Type: `Function`
Default value: `null`

Filter the input markdown by providing a function taking the original string as argument and returning the modified string.

#### options.title
Type: `String`
Default value: `''`

Specify the title of a rendered html page. Provide a function to set the title according to source file.

#### options.wrap
Type: `String`
Default value: `'<div class="highlight-example"></div>'`

Specify a wrapper for the generated live-samples.

### Usage Examples

#### Default Options
In this example, markdown as well as an html presentation containing live-samples is generated from a README.md-file.

```js
grunt.initConfig({
  livemd: {
    options: {},
    files: {
      'dest/default_options/README.md': ['src/README.md'],
      'dest/default_options/README.html': ['src/README.md']
    },
  },
});
```

#### Custom Options
In this example, an html presentation containing live-samples is generated from a markdown-file with custom template and wrapper.

```js
grunt.initConfig({
  livemd: {
    options: {
      wrap: '<div class="live-example"></div>',
      layout: {
        template: 'layout.html',
        data: {
          test: 'This example demonstrates how to use grunt-livemd with a custom template'
        }
      },
      title: function(src) {
        return "Title of " + src;
      }
    },
    files: {
      'dest/custom_options/README.html': ['src/README.md']
    },
  },
});
```

#### Advanced Options
This example demonstrates how to strip off unwanted links by making use of a prefilter.

```js
grunt.initConfig({
  livemd: {
    options: {
      options: {
        prefilter: function(string) {
          return string.replace(grunt.config().pkg && grunt.config().pkg.homepage && new RegExp("\\[.*\\]\\(" + grunt.config().pkg.homepage.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&") + "\\)", "gi"), "");
        }
      }
    },
    files: {
      'dest/advanced_options/README.html': ['src/README.md']
    },
  },
});
```

## Demo Projects

* [visualist](http://benignware.github.io/visualist/)
* [jquery-findus](http://benignware.github.io/jquery-findus/)
* [jquery-placepicker](http://benignware.github.io/jquery-placepicker/)
* [jquery-vgrd](http://benignware.github.io/jquery-vgrd/)
* [jquery-checkview](http://benignware.github.io/jquery-checkview/)
* [jquery-countimator](http://benignware.github.io/jquery-countimator/)

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

* v0.0.6 - Fixed entities in inline code blocks
* v0.0.5 - Fixed marked parsing links within html comments
* v0.0.4 - Fixed incompatible pygments style
* v0.0.3 - Updated `livemd` to v0.0.6
* v0.0.2 - Updated `livemd` to v0.0.3, updated samples and tests, added demo site
* v0.0.1 - Initial release
