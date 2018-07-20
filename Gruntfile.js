module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt);

  // Listing Tasks
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    // Copies templates and assets from dependencies and/or src
    copy: {

      fsa_stylesheets: {
        expand: true,
        src: '**',
        cwd: 'node_modules/fsa-style/src/stylesheets',
        dest: 'src/stylesheets'
      },

      fsa_fonts: {
        expand: true,
        src: '**',
        cwd: 'node_modules/fsa-style/src/fonts',
        dest: 'src/fonts'
      },

      fsa_img: {
        expand: true,
        src: '**',
        cwd: 'node_modules/fsa-style/src/img',
        dest: 'src/img'
      },

      fsa_js: {
        expand: true,
        src: '**',
        cwd: 'node_modules/fsa-style/src/js',
        dest: 'src/js'
      },

      fonts: {
        expand: true,
        src: '**',
        cwd: 'src/fonts',
        dest: 'dist/fonts'
      },

      img: {
        expand: true,
        src: '**',
        cwd: 'src/img',
        dest: 'dist/img'
      },

      js: {
        expand: true,
        src: '**',
        cwd: 'src/js/vendor',
        dest: 'dist/js/vendor'
      },

    },

    simple_include: {
      options: {
        html_comment: true,
      },
      default_options: {
        src: [
          'src/*.html'
        ],
        dest: '.ugly/'
      },
    },

    // Sass all the style things
    sass: {
      default: {
        files: {
          'dist/css/<%= pkg.name %>.css': 'src/stylesheets/<%= pkg.name %>.scss'
        },
        options: {
          sourceMap: true,
          outputStyle: 'expanded'
        },
      },
      minify: {
        files: {
          'dist/css/<%= pkg.name %>.min.css': 'src/stylesheets/<%= pkg.name %>.scss'
        },
        options: {
          sourceMap: true,
          outputStyle: 'compressed'
        },
      },
    },

    // Watches files for changes and run relevant tasks
    watch: {
      css: {
        files: [
          'src/stylesheets/*.scss',
          'src/stylesheets/**/*.scss'
        ],
        tasks: ['sass', 'scsslint', 'postcss'],
        options: { nospawn: true }
      },
      html: {
        files: [
          'src/*.html',
        ],
        tasks: ['simple_include','prettify'],
      },
      js: {
        files: [
          'src/js/*.js',
        ],
        tasks: ['browserify']
      },
      img: {
        files: [
          'src/img/**/*.jpeg',
          'src/img/**/*.jpg',
          'src/img/**/*.gif',
          'src/img/**/*.svg',
        ],
        tasks: ['copy:img']
      },
    },

    // Clear files and folders
		clean: {
			dist: [ 'dist' ]
		},

    // Make our HTML files perfectly formatted and humanly scannable
    prettify: {
      options: {
        config: '.prettifyrc'
      },
      all: {
        expand: true,
        cwd: './.ugly',
        ext: '.html',
        src: ['*.html'],
        dest: 'dist/'
      },
    },

    // Lint scss files
    scsslint: {
      allFiles: [
        'src/stylesheets/*.scss',
        'src/stylesheets/**/*.scss'
      ],
      options: {
        bundleExec: false,
        colorizeOutput: true,
        config: '.scss-lint.yml',
        force: true,
        reporterOutput: null
      },
    },

    // PostCSS, primarily to autoprefix
    postcss: {
      options: {
        map: {
          inline: false, // save all sourcemaps as separate files...
          annotation: 'dist/css' // ...to the specified directory
        },
        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('postcss-quantity-queries')(), // do things like .asdf:at-least(4) {} ; https://github.com/pascalduez/postcss-quantity-queries
          require('autoprefixer')({ browsers: 'last 3 versions' }), // add vendor prefixes
          // require('cssnano')() // minify the result
        ]
      },
      dist: {
        src: 'dist/css/*.css'
      }
    },

    // Live Reload and Browser Sync'ing
    browserSync: {
      dev: {
        files: {
          src : [
            'dist/**/*.gif',
            'dist/**/*.svg',
            'dist/**/*.jpg',
            'dist/**/*.jpeg',
            'dist/*.html',
            'dist/css/*.css',
            'dist/js/*.js'
          ]
        },
        options: {
          watchTask: true,
          server: './dist/'
        }
      }
    },

    // Browserify them JSs
    browserify: {
      main: {
        files: {
          'dist/js/<%= pkg.name %>.js': [
            'src/js/<%= pkg.name %>.js'
            ,'src/js/test.js'
          ]
          // ,'dist/js/uswds.js': [
          //   'node_modules/uswds/src/js/start.js',
          //   // 'path/to/another/file.js',
          // ],
        }
      }
    },

  });

  // Register Tasks
  grunt.registerTask('default', ['build', 'browserSync', 'watch']);
  grunt.registerTask('build', [
    'clean:dist',
    'copy',
    'sass',
    'postcss',
    'simple_include',
    'prettify',
    'browserify',
    'lint'
  ]);

  grunt.registerTask('lint', 'scsslint');
  grunt.registerTask('test', 'default', function () { grunt.log.writeln('Test that the app runs');});

};
