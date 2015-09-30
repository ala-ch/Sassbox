module.exports = function(grunt) {

  // dynamically load grunt plugins
  require('jit-grunt')(grunt);

  // project configuration
  grunt.initConfig({

    // read package info
    pkg: grunt.file.readJSON('package.json'), 

    // paths
    srcPath: 'src',
    buildPath: 'demo', 
    sassSrcPath: 'src/styles',
    cssBuildPath: 'demo/styles',
    sassboxPath: 'src/sassbox',
    sassdocPath: 'docs',

    // watch: plugin config
    watch: {
      jade: {
        files: ['<%= srcPath %>/{,*/}*.jade'],
        tasks: ['jade']
      }, 
      sass: {
        files: ['<%= sassSrcPath %>/{,*/}*.scss'],
        tasks: ['sass']
      }, 
      sassdoc: {
        files: ['<%= sassboxPath %>/{,*/}*.scss'],
        tasks: ['sassdoc']
      }
    },
    
    // clean: plugin config
    clean: {
      client: {
        src: [
          '<%= buildPath %>',
          '<%= sassdocPath %>'
        ]
      }
    },

    // jade: plugin config
    jade: {
      base: {
        options: {
          pretty: true,
        },
        files: [
          {
            expand: true,
            cwd: '<%= srcPath %>',
            src: '{,*/}*.jade',
            dest: '<%= buildPath %>',
            ext: '.html'
          }
        ]
      }
    }, 
    
    // sass: plugin config
    sass: {
      options: {
        precision: 10
      }, 
      dist: {
        expand: true, 
        cwd: '<%= sassSrcPath %>', 
        src: ['{,*/}*.scss'], 
        dest: '<%= cssBuildPath %>',
        ext: '.css'
      }
    }, 
    
    // sassdoc: plugin config
    sassdoc: {
      default: {
        options: {
          dest: '<%= sassdocPath %>',
          theme: 'default'
        },
        src: '<%= sassboxPath %>'
      }
    }
      
  });

  // register tasks
  grunt.registerTask('default', [
    'clean', 
    'jade', 
    'sass'
  ]);

};
