// Gruntfile.js

// Wrapper function (required by grunt and its plugins)
// All configuration goes inside this function
module.exports = function(grunt) {

    // =========================================================================
    // CONFIGURE GRUNT =========================================================
    // =========================================================================
    grunt.initConfig({

        // Get the configuration info from package.json,
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // Configure jshint to validate js files
        jshint: {
            options: {
                reporter: require('jshint-stylish')
            },

            // When this task is run, lint the Gruntfile and all js files in public
            dev: ['Gruntfile.js', 'src/**/*.js'],
            production: ['Gruntfile.js', 'src/**/*.js']
        },

        // Configure uglify to minify js files
        uglify: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            production: {
                files: {
                    'dist/js/scripts.min.js': 'src/js/scripts.js'
                    // Combine files with: 'dist/js/filename_combination.min.js': ['src/js/filename1.js', 'src/js/filename2.js']
                }
            }
        },

        // Compile less stylesheets to css
        less: {
            dev: {
                files: {
                    'src/css/main.css': 'src/less/main.less'
                }
            },
            production: {
                files: {
                    'src/css/main.css': 'src/less/main.less'
                }
            }
        },

        // Configure cssmin to minify css files
        cssmin: {
            options: {
                banner: '/*\n <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n*/\n'
            },
            dev: {
                files: {
                    'dist/css/main.min.css': 'src/css/main.css'
                }
            },
            production: {
                files: {
                    'dist/css/main.min.css': 'src/css/main.css'
                }
            }
        },

        // Configure watch to auto run tasks
        watch: {

            // Compile less when it changes
            less: {
                files: ['src/**/*.less'],
                tasks: ['less:dev'],
                options: {
                    livereload: true
                }
            },

            // Minify css when it changes
            css: {
                files: ['src/**/*.css'],
                tasks: ['cssmin:dev']
            },

            // For scripts, run jshint
            scripts: {
                files: 'src/**/*.js',
                tasks: ['jshint:dev']
            },

            // For livereloading any frontend files (templates, css, etc)
            frontend: {
                options: {
                    livereload: true
                },
                files: [
                    'src/css/*.css',
                    'src/**/*.html'
                ]
            }
        },

        // Configure http server to serve the application
        connect: {
            dev: {
                options: {
                    port: 3000,
                    hostname: '*',
                    base: 'src'
                }
            },
            devbrowser: {
                options: {
                    port: 3000,
                    hostname: '*',
                    base: 'src',
                    open: true
                }
            }
        }
    });

    // ============= CREATE TASKS ========== //
    // This is the primary development task to run the server and the watches
    grunt.registerTask('serve', ['connect:dev', 'watch:less', 'watch:frontend']);
    grunt.registerTask('serve-b', ['connect:devbrowser', 'watch:less', 'watch:frontend']);

    // This default task will go through all configuration (dev and production) in each task
    grunt.registerTask('default', ['jshint', 'uglify', 'cssmin', 'less']);

    // This task will only run the dev configuration
    grunt.registerTask('dev', ['jshint:dev', 'cssmin:dev', 'less:dev']);

    // Only run production configuration
    grunt.registerTask('production', ['jshint:production', 'uglify:production', 'cssmin:production', 'less:production'])

    // =========================================================================
    // LOAD GRUNT PLUGINS ======================================================
    // =========================================================================
    // We can only load these if they are in our package.json
    // make sure you have run npm install so our app can find these
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
};
