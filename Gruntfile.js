module.exports = function (grunt) {
  "use strict";

  // Project configuration.
  grunt.initConfig({
    pkg: '<json:package.json>',

// CLEAN ///////////////////////////////////////////////////////////////////////
    clean: {
      release: [ 'release/*' ]
    },

// JSHINT //////////////////////////////////////////////////////////////////////
    jshint: {
      jshintrc: '.jshintrc',
      gruntfile: 'Gruntfile.js',
      main: [
        'source/assets/js/script.js'
      ]
    },

// PHPLINT /////////////////////////////////////////////////////////////////////
    phplint: {
      options: {
        spawnLimit: 10
      },
      files: [ 'source/**/*.php' ]
    },

// UGLIFY //////////////////////////////////////////////////////////////////////
    uglify: {
      main: {
        files: {
          'release/assets/js/script.min.js': '<%= jshint.main %>',
        }
      },
    },

// COMPASS /////////////////////////////////////////////////////////////////////
    compass: {
      // configured in config.rb for toolchain portability
      dev:  { options: { environment:  'development' } },
      prod: { options: { environment:  'production' } }
    },

// HASHMAP /////////////////////////////////////////////////////////////////////
    hashmap: {
      options: {
        merge:  true,
        output: 'release/assets.json',
        rename: '#{= dirname}/#{= basename}.#{= hash}#{= extname}'
      },
      all: {
        cwd:   'release/assets', // get files from here
        dest:  'release/assets', // renamed copy them here
        src:   [ 'js/**/*.js', 'css/**/*.css' ] // look for these
      }
    },

// IMAGEMIN ////////////////////////////////////////////////////////////////////
    imagemin: {
      prod: {
        expand: true,
        cwd:  'source/assets/img',
        src:  '*.{png,jpg,jpeg}',
        dest: 'release/assets/img/'
      }
    },

// COPY ////////////////////////////////////////////////////////////////////////
    copy: {
      dev: {
        files: {
          'source/editor-style.css':  'source/assets/css/editor-style.css',
          'source/style.css':         'source/assets/css/style-dev.css'
        }
      },
      raw: {
        files: [{
          expand: true,
          cwd: 'source/',
          src: ['**'],
          dest: 'release/'
        }]
      },
      release: {
        files: {
          'release/editor-style.css':  'release/assets/css/editor-style.css',
          'release/style.css':         'release/assets/css/style-prod.css'
        }
      }
    },

// WATCH ///////////////////////////////////////////////////////////////////////
    watch: {
      gruntfile: {
        files: [ 'Gruntfile.js' ],
        tasks: [ 'jshint:gruntfile' ],
        options: {
          nospawn: true
        }
      },
      js: {
        files: [ 'source/assets/js/*.js' ],
        tasks: [ 'jshint:main' ],
        options: {
          nospawn: true
        }
      },
      sass: {
        files: [ 'assets/sass/*.scss' ],
        tasks: [ 'compass:dev', 'copy:dev' ],
        options: {
          nospawn: true
        }
      }
    }

  });

// LOAD TASKS //////////////////////////////////////////////////////////////////
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bump');
  grunt.loadNpmTasks('grunt-hashmap');
  grunt.loadNpmTasks('grunt-phplint');

// REGISTER TASKS //////////////////////////////////////////////////////////////
  grunt.registerTask('dev', [
    'jshint',
    // other tests

    'uglify',
    'compass:dev',
    'copy:dev'
  ]);

  grunt.registerTask('release', [
    'dev',
    'clean:release',

    // raw files
    'copy:raw',

    // compile files
    'compass:prod',
    'imagemin',

    // copy style-prod.css to style.css
    'copy:release',

    // cachebust files
    'hashmap'
  ]);

  grunt.registerTask('test', [
    'jshint',
    'phplint'
  ]);

  grunt.registerTask('default', [
    'dev',
    'watch'
  ]);
};
