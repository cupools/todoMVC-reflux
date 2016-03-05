module.exports = function(grunt) {
    'use strict';

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
        }
    };

    grunt.initConfig(initConfig);

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-compile-handlebars');
    grunt.loadNpmTasks('grunt-webpack');

    grunt.initConfig(initConfig);

    grunt.registerTask('dev', [
        'express:dev',
        'watch'
    ]);

    grunt.registerTask('release', [
        'render',
        'webpack:release'
    ]);

    // 构建模板任务
    grunt.registerTask('render', 'exports template to html', render);

    // 模板输出为 html 至 build 文件夹
    function render() {
        var consolidate = require('consolidate'),
            async = require('async'),
            app = require('./server/app'),
            utils = require('./config/utils'),
            done = this.async();

        grunt.log.subhead('delete ./build');
        grunt.file.delete('./build');

        grunt.log.subhead('building static html files');

        async.each(utils.getViews(), function(file, callback) {
            app.render(file, {
                partials: utils.getPartials(file)
            }, function(err, html) {
                grunt.file.write('build/' + utils.getBaseName(file) + '.html', html);
                grunt.log.ok('build/' + utils.getBaseName(file) + '.html');
                callback();
            });
        }, function(err) {
            if(err) {
                grunt.log.error(err.message)
            }
            done();
        });
    }

};