module.exports = function (grunt) {

    var config = {
        host: 'localhost',
        port: null
    }

    if (!config.port)
        throw new Error('obrigatório configurar porta de conexão com o website');

    //dependencies
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var gruntSettings = {

        /* COMPILADOR LESS */
        less: {
            lessfilesForms: {
                files: {
                    "dev/less/css/forms.css": "dev/less/components/forms.less"
                }
            },
            lessfilesMain: {
                files: {
                    "dev/less/css/main.css": "dev/less/main.less"
                }
            }
        },

        /* POST CSS AUTO-PREFIXER CSS */
        postcss: {
            options: {
                processors: [
                  require('autoprefixer')({
                      remove: false,
                      browsers: [
                          'last 4 Chrome versions',
                          'last 4 Firefox versions',
                          'last 4 Explorer versions',
                          'last 4 Edge versions',
                          'last 4 iOS versions',
                          'last 4 Opera versions',
                          'last 4 Safari versions',
                          'last 4 OperaMobile versions',
                          'last 4 OperaMini versions',
                          'last 4 ChromeAndroid versions',
                          'last 4 FirefoxAndroid versions',
                          'last 4 ExplorerMobile versions'
                      ]
                  })
                ]
            },
            lessfilesForms: {
                src: 'dev/less/css/forms.css',
            },
            lessfilesMain: {
                src: 'dev/less/css/main.css',
            },
            cssvendor: {
                src: ['dev/vendor/**/*.css'],
            }
        },

        /* CSSMIN MINIFICA, COMBINA CSS */
        cssmin: {
            options: {
                report: 'gzip'
            },
            lessfilesForms: {
                files: {
                    'css/forms.min.css': ['dev/less/css/forms.css']
                },
            },
            lessfilesMain: {
                files: {
                    'css/main.min.css': ['dev/less/css/main.css']
                },
            },
            cssvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/vendor/',
                    src: ['**/*.css', '!**/*.min.css'],
                    dest: 'vendor/',
                    ext: '.min.css',
                    extDot: 'last'
                }]
            },
        },

        /* UGLIFY MINIFICA */
        uglify: {
            options: {
                sourceMap: false
            },
            jsfiles: {
                files: [{
                    expand: true,
                    cwd: 'dev/js/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'js/',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            },
            jsvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/vendor/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'vendor/',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            },
        },

        /* COPY, COPIA PLUGINS */
        copy: {
            copyvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/vendor/',
                    src: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.cur', '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.php'],
                    dest: 'vendor/'
                }]
            }
        },

        /* AUTO UPDATE */
        browserSync: {
            geral: {
                bsFiles: {
                    src: [
                        '**/*.html',        // html page
                        '**/*.aspx',        // asp page
                        '**/*.min.css',     // css
                        '**/*.min.js',      // js
                        '**/*.ascx',        // asp user control
                        '**/*.ashx',        // asp handlers
                        '**/*.master',      // asp master page
                        '**/*.cs'           // asp coding file
                    ]
                },
                options: {
                    watchTask: true,
                    startPath: "/default.aspx",
                    proxy: config.host + ':' + config.port,
                    notify: false,
                    open: false
                }
            }
        },

        /* WATCH, VERIFICA ALTERAÇÕES NOS ARQUIVOS */
        watch: {
            //options: {
            //    spawn: false
            //},
            lessfilesForms: {
                files: ['dev/less/**/*.less', '!dev/less/main.less', '!dev/less/components/boxmsg.less'],
                tasks: ['less:lessfilesForms', 'postcss:lessfilesForms', 'cssmin:lessfilesForms']
            },
            lessfilesMain: {
                files: ['dev/less/**/*.less', '!dev/less/components/forms.less'],
                tasks: ['less:lessfilesMain', 'postcss:lessfilesMain', 'cssmin:lessfilesMain']
            },

            jsfiles: {
                files: ['dev/js/**/*.js'],
                tasks: ['uglify:jsfiles']
            },

            cssvendor: {
                files: ['dev/vendor/**/*.css'],
                tasks: ['postcss:cssvendor', 'cssmin:cssvendor']
            },
            jsvendor: {
                files: ['dev/vendor/**/*.js'],
                tasks: ['uglify:jsvendor']
            },

            gruntfile: {
                files: ['gruntfile.js']
            }

        },

        /* DELETA AS PASTAS */
        clean: ['css', 'dev/less/css', 'js', 'vendor']

    };

    grunt.initConfig(gruntSettings);

    /* TAREFA PADRÃO */
    grunt.registerTask('default', ['browserSync', 'watch']);

    /* TAREFA GERA TUDO */
    grunt.registerTask('init', ['clean', 'less', 'postcss', 'cssmin', 'uglify', 'copy']);
};
