module.exports = function(grunt) {
    'use strict';

    var initConfig = {
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
        },
        // 开发服务器
        express: {
            options: {
                port: 9000
            },
            dev: {
                options: {
                    script: 'server/express.js'
                }
            }
        },
        webpack: {
            release: require('./config/webpack.prod.js')
        },
        // 监听
        watch: {
            express: {
                files: [
                    'server/*.js'
                ],
                tasks: ['express:dev'],
                options: {
                    spawn: false
                }
            }
        }
    };

    grunt.initConfig(initConfig);

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.initConfig(initConfig);

    // 开发服务器任务
    grunt.registerTask('dev', [
        'express:dev',
        'watch'
    ]);

    grunt.registerTask('release', [
        'webpack:release'
    ]);

};