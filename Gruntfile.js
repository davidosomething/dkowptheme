module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

// AUTOPREFIXER ////////////////////////////////////////////////////////////////
    autoprefixer: {
      options: {
        browsers: ['last 2 versions', 'safari 5', 'ie 9', 'ie 8', 'ie 7']
      },
      build: {
        files: {
          // act on built compass compiled CSS in the build folder
          'build/assets/css/main.css': 'build/assets/css/main.css'
        }
      }
    },

// CLEAN ///////////////////////////////////////////////////////////////////////
    clean: {
      build: 'build/*',
      release: 'release/*'
    },

// COMPASS /////////////////////////////////////////////////////////////////////
    compass: {
      all: {
        options: {
          config: 'config.rb',
          environment: 'development',
          force: true
        }
      },
    },

// CONCAT //////////////////////////////////////////////////////////////////////
    concat: {
      options: {
        separator: ';\n'
      },
      build: {
      },
      plugins: {
        files: {
          'build/assets/js/plugins.js': [
            'source/assets/js/vendor/jquery.fittext.js'
          ]
        }
      }
    },

// COPY ////////////////////////////////////////////////////////////////////////
    copy: {
      release: {
        expand: true,
        cwd:    'build/',
        src:    '**/*',
        dest:   'release'
      }
    },

// CSSLINT /////////////////////////////////////////////////////////////////////
    csslint: {
      options: {
        csslintrc: '.csslintrc',
        import: false
      },
      warnings: {
        src: [ 'build/assets/css/*.css' ]
      }
    },

// CSSO ////////////////////////////////////////////////////////////////////////
    csso: {
      options: {
        report: 'min'
      },
      release: {
        files: {
          'release/assets/css/main.css': 'release/assets/css/main.css'
        }
      }
    },

// HANDLEBARS //////////////////////////////////////////////////////////////////
    handlebars: {
      compile: {
        options: {
          namespace: "JST",
          wrapped: true,
          partialsUseNamespace: true
        },
        files: {
          'build/assets/js/hbs.js': 'source/hbs/**/*.hbs'
        }
      }
    },

// HASHMAP /////////////////////////////////////////////////////////////////////
    hashmap: {
      options: {
        rename: '#{= dirname}/#{= basename}.#{= hash}#{= extname}'
      },
      release: {
        cwd:  'release/assets',
        src:  [ 'js/**/*.js', 'css/**/*.css' ],
        dest: 'release/assets'
      }
    },

// IMAGEMIN ////////////////////////////////////////////////////////////////////
    imagemin: {
      build: {
        expand:  true,
        cwd:     'source/assets/img/',
        src:     '**/*.{gif,png,jpg,jpeg}',
        dest:    'build/assets/img/'
      }
    },

// JSHINT //////////////////////////////////////////////////////////////////////
    jshint: {
      jshintrc:   '.jshintrc',
      gruntfile:  'Gruntfile.js',
      main:       [
        'source/assets/js/script.js'
      ]
    },

// UGLIFY //////////////////////////////////////////////////////////////////////
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> */\n',
        mangle: false
      },
      build: {
        files: {
          'build/assets/js/script.js': [
            'build/assets/js/hbs.js',
            'source/assets/js/script.js'
          ]
        }
      },
      plugins: {
        files: {
          'build/assets/js/plugins.js': 'build/assets/js/plugins.js'
        }
      }
    },

// WATCH ///////////////////////////////////////////////////////////////////////
    watch: {
      options: { nospawn: true },
      gruntfile: {
        files: [ 'Gruntfile.js' ],
        tasks: [ 'jshint:gruntfile' ]
      },
      js: {
        files: [ 'source/assets/js/*.js' ],
        tasks: [ 'jshint:main', 'uglify:main' ]
      },
      sass: {
        files: [ 'source/assets/sass/**/*.scss' ],
        tasks: [ 'compass', 'csslint', 'autoprefixer' ]
      }
    }
  });

// LOAD TASKS //////////////////////////////////////////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-contrib-handlebars');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-csso'); // @todo
  grunt.loadNpmTasks('grunt-hashmap');

// REGISTER TASKS //////////////////////////////////////////////////////////////
  grunt.registerTask('test', [
    'jshint:gruntfile'
  ]);

  grunt.registerTask('default', [
    'build',
    'watch'
  ]);

  grunt.registerTask('release', [
    'build',            // create build folder from source
    'clean:release',
    'copy:release',     // copy build folder to release
    'csso:release',     // further release compilation
    'hashmap:release',  // cachebuster
  ]);

  grunt.registerTask('build', [ // create build folder from source
    'js',
    'css',
    'imagemin:build'
  ]);

  grunt.registerTask('js', [
    'concat:build',
    'uglify:build'
  ]);

  grunt.registerTask('css', [
    'compass:all',
    'autoprefixer:build' // autoprefix compiled css in build folder
  ]);
};
