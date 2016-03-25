module.exports = function(grunt) {
    'use strict';

    var utils = require('./config/utils');

    var initConfig = {
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        express: {
            dev: {
                options: {
                    script: 'server/express.js'
                }
            }
        },
        webpack: {
            release: require('./config/webpack.prod.js')
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'public/**/*.js',
                '!public/bower_components/**/*.js'
            ]
        },
        watch: {
            express: {
                files: [
                    'server/*.js',
                    'config/**/*.js'
                ],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        },
        weinre: {
            dev: {
                options: {
                    httpPort: 9001,
                    boundHost: utils.getIP()
                }
            }
        }
    };

    grunt.initConfig(initConfig);

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-weinre');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.registerTask('weinre', [
        'weinre'
    ]);

    grunt.registerTask('dev', [
        'express:dev',
        'watch'
    ]);

    grunt.registerTask('release', [
        'jshint',
        'clean',
        'webpack:release'
    ]);

    // 重新构建 build
    grunt.registerTask('clean', 'delete build directory', function() {
        grunt.log.subhead('delete ./build');
        grunt.file.delete('./build');
    });

};