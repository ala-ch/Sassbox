module.exports = function(grunt) {

  // dynamically load grunt plugins
  require('jit-grunt')(grunt, {
    'bump-only': 'grunt-bump', 
    'bump-commit': 'grunt-bump'
  });

  // project configuration
  grunt.initConfig({

    // read package info
    pkg: grunt.file.readJSON('package.json'), 

    // paths
    srcPath: 'src/demo',
    buildPath: 'demo', 
    sassSrcPath: 'src/demo/styles',
    cssBuildPath: 'demo/styles',
    sassboxPath: 'src/sassbox/modules',
    sassdocPath: 'docs',
    sassboxFile: '_sassbox.scss',

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
      demo: {
        src: [
          '<%= buildPath %>'
        ]
      },
      docs: {
        src: [
          '<%= sassdocPath %>'
        ]
      },
      dist: {
        src: [
          '<%= sassboxFile %>'
        ]
      }
    },

    // copy: plugin configuration
    copy: {
      demo: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= srcPath %>',
          dest: '<%= buildPath %>',
          src: [
            'images/{,*/}*.{gif,jpg,png,svg,webp}'
          ]
        }]
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
    
    // concat: plugin config
    concat: {
      sassbox: {
        options: {
          banner: '// <%= pkg.name %> <%= pkg.version %> \n' +
                  '// <%= pkg.repository.url %>\n' +
                  '// (c) 2015, <%= grunt.template.today("yyyy") %> <%= pkg.author.name %> <<%= pkg.author.url %>>\n' + 
                  '// <%= pkg.license %>\n' + 
                  '// <%= grunt.template.today("dd.mm.yyyy HH:MM") %>\n\n'
        },
        src: ['<%= sassboxPath %>/{,*/}_*.scss'],
        dest: '<%= sassboxFile %>'
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
    }, 
    
    // bump version: plugin config
    bump: {
      options: {
        files: ['package.json'],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: ['package.json'],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: true,
        pushTo: 'upstream',
        gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    }

  });

  // register tasks
  grunt.registerTask('default', 'clean-build of dist, docs and demo project', [
    'clean',
    'copy', 
    'concat:sassbox',
    'jade', 
    'sass', 
    'sassdoc'
  ]);
  
  grunt.registerTask('dist', 'build the dist file', [
    'concat:sassbox'
  ]);

  grunt.registerTask('docs', 'build the docs (alias for task sassdoc)', [
    'clean:docs',
    'sassdoc'
  ]);

  grunt.registerTask('demo', 'build the demo project', [
    'clean:demo',
    'copy',
    'jade', 
    'sass'
  ]);

};
