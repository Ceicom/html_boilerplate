module.exports = function (grunt) {

    var config = {
        host: 'localhost',
        port: null
    }

    if (!config.port) {
        console.info("obrigatório configurar porta de conexão com o website");
        return;
    }

    //dependencies
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var gruntSettings = {

        /* COMPILADOR LESS */
        less: {
            /*
             * 2 compilações para que o formee ainda tenha um css separado
             */
            lessfilesForms: {
                files: {
                    "dev/less/css/forms.css": "dev/less/components/forms.less",
                    "dev/less/css/tooltip.css": "dev/less/components/tooltip.less"
                },
            },
            lessfilesMain: {
                files: {
                    "dev/less/css/main.css": "dev/less/main.less",
                    "dev/less/css/boxmsg.css": "dev/less/components/boxmsg.less"
                },
            },
            lessfileModal: {
                files: {
                    "dev/vendor/cModal/modal.css": "dev/vendor/cModal/modal.less"
                },
            },
            lessfileYoutubeVideo: {
                files: {
                    "dev/vendor/youtube.video/yv.css": "dev/vendor/youtube.video/yv.less"
                },
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
            lessFilesTooltip: {
                src: 'dev/less/css/tooltip.css',
            },
            lessFilesBox: {
                src: 'dev/less/css/boxmsg.css',
            },
            // para os plugins
            cssvendor: {
                src: ['dev/vendor/**/*.css'],
            }
        },

        /* CSSMIN MINIFICA, COMBINA CSS */
        cssmin: {
            // minifica o main e o formee
            lessfilesForms: {
                files: {
                    'css/forms.min.css': ['dev/less/css/forms.css'],
                    'css/tooltip.min.css': ['dev/less/css/tooltip.css']
                },
            },
            lessfilesMain: {
                files: {
                    'css/main.min.css': ['dev/less/css/main.css'],
                    'css/boxmsg.min.css': ['dev/less/css/boxmsg.css']
                },
            },

            // minifica os css´s dos plugins
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
                sourceMap: false,    // gera sitemaps
            },
            // arquivos da pasta js (geralmente criados pelo dev)
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
            // arquivos de plugins, minifica eles
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
            /*
             * SÓ COPIA ARQUIVOS NECESSÁRIOS
             * 
             * da pasta: /vendor/...
             * para a pasta: /modulos/...
             * 
             * .min.js
             * .js.map
             * .min.css
             * .jpg
             * .png
             * .gif
             * 
            */
            copyvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/vendor/',
                    src: ['**/*.jpg', '**/*.png', '**/*.gif', '**/*.cur', '**/*.eot', '**/*.svg', '**/*.ttf', '**/*.woff', '**/*.woff2', '**/*.php'],
                    dest: 'vendor/'
                }]
            }
        },

        /* 
            DELETA AS PASTAS 
            no intuito de só mandar o necessário
        */
        clean: ['css','js','vendor'],


        /* AUTO UPDATE */
        browserSync: {
            /*
             * acompanha alterações nos arquivos:
              .css
              .min.js
              .aspx
              .master
              .html
              .ashx
    
             */
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
                    //logLevel: "debug",
                    open: false
                }
            }
        },

        /* WATCH, VERIFICA ALTERAÇÕES NOS ARQUIVOS */
        watch: {
            /*
             * tarefa padrão de desenvolvimento
             */
            options: {
                spawn: false,
            },
            lessfilesForms: {
                files: ['dev/less/**/*.less', '!dev/less/main.less'],
                tasks: ['less:lessfilesForms', 'postcss:lessfilesForms', 'postcss:lessFilesTooltip', 'cssmin:lessfilesForms']
            },
            lessfilesMain: {
                files: ['dev/less/**/*.less', '!dev/less/components/forms.less', '!dev/less/components/tooltip.less'],
                tasks: ['less:lessfilesMain', 'postcss:lessfilesMain', 'postcss:lessFilesBox', 'cssmin:lessfilesMain']
            },
            jsfiles: {
                files: ['dev/js/**/*.js'],
                tasks: ['uglify:jsfiles']
            },
            lessModal: {
                files: ['dev/vendor/cModal/**/*.less'],
                tasks: ['less:lessfileModal', 'postcss:cssvendor', 'cssmin:cssvendor']
            },
            lessYoutubeVideo: {
                files: ['dev/vendor/youtube.video/**/*.less'],
                tasks: ['less:lessfileYoutubeVideo', 'postcss:cssvendor', 'cssmin:cssvendor']
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

        }

    };

    grunt.initConfig(gruntSettings);

    /* TAREFA PADRÃO */
    grunt.registerTask('default', ['browserSync', 'watch']);
    
    /* TAREFA SÓ GRUNT */
    grunt.registerTask('grunt', ['watch']);

    /* TAREFA GERA TUDO */
    grunt.registerTask('init', ['clean', 'less', 'postcss', 'uglify', 'cssmin', 'copy']);
};
