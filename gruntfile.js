module.exports = function (grunt) {

    const config = {
        host: 'localhost',
        port: null
    };

    if (!config.port) throw new Error('obrigatório configurar porta de conexão com o website');

    //dependencies
    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    const gruntSettings = {

        /* COMPILADOR LESS */
        less: {
            lessfiles: {
                files: {
                    "dev/tmp/less/main.css": "dev/less/main.less"
                },
                ieCompat: false
            }
        },

        /* POST CSS AUTO-PREFIXER CSS */
        postcss: {
            options: {
                processors: [
                    require('autoprefixer')({
                        remove: false,
                        grid: true,
                        browsers: [
                            'last 4 Chrome versions',
                            'last 4 Firefox versions',
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
            lessfiles: {
                src: 'dev/tmp/less/main.css'
            },
            cssvendor: {
                src: ['dev/vendor/**/*.css']
            }
        },

        /* CSSMIN MINIFICA, COMBINA CSS */
        cssmin: {
            options: {
                report: 'gzip'
            },
            lessfiles: {
                files: {
                    'css/main.min.css': ['dev/tmp/less/main.css']
                }
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
            }
        },

        /* BABEL */
        babel: {
            options: {
                presets: ['@babel/preset-env']
            },
            jsfiles: {
                files: [{
                    expand: true,
                    cwd: 'dev/js/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'dev/tmp/js/'
                }]
            },

            jsvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/vendor/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'dev/tmp/vendor/'
                }]
            }
        },

        /* UGLIFY MINIFICA */
        uglify: {
            options: {
                compress: {
                    drop_debugger: false
                }
            },
            jsfiles: {
                files: [{
                    expand: true,
                    cwd: 'dev/tmp/js/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'js/',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            },
            jsvendor: {
                files: [{
                    expand: true,
                    cwd: 'dev/tmp/vendor/',
                    src: ['**/*.js', '!**/*.min.js'],
                    dest: 'vendor/',
                    ext: '.min.js',
                    extDot: 'last'
                }]
            }
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

        /* DELETA AS PASTAS */
        clean: ['css', 'dev/tmp', 'js', 'vendor', 'images/**/*.min.svg'],

        /* OPTIMIZE SVG */
        svgmin: {
            options: {
                plugins: [
                    { removeTitle: false },
                    { removeDesc: false },
                    { convertStyleToAttrs: false },
                    { removeHiddenElems: false },
                    { removeViewBox: false },
                    { removeUnknownsAndDefaults: false },
                    { removeUselessStrokeAndFill: false },
                    { removeRasterImages: true },
                    { sortAttrs: true },
                    { removeDimensions: true }
                ]
            },
            files: {
                files: [{
                    expand: true,
                    cwd: 'images/',
                    src: ['**/*.svg', '!**/*.min.svg'],
                    dest: 'images/',
                    ext: '.min.svg',
                    extDot: 'last'
                }]
            }
        },

        /* WATCH, VERIFICA ALTERAÇÕES NOS ARQUIVOS */
        watch: {
            options: {
                spawn: false,
                interrupt: true
            },
            lessfiles: {
                files: ['dev/less/**/*.less'],
                tasks: ['less:lessfiles', 'postcss:lessfiles', 'cssmin:lessfiles']
            },
            jsfiles: {
                files: ['dev/js/**/*.js'],
                tasks: ['babel:jsfiles', 'uglify:jsfiles']
            },
            cssvendor: {
                files: ['dev/vendor/**/*.css'],
                tasks: ['postcss:cssvendor', 'cssmin:cssvendor']
            },
            jsvendor: {
                files: ['dev/vendor/**/*.js'],
                tasks: ['babel:jsfiles', 'uglify:jsvendor']
            },
            svg: {
                files: ['images/**/*.svg', '!images/**/*.min.svg'],
                tasks: ['svgmin']
            },
            gruntfile: {
                files: ['gruntfile.js']
            }
        }
    };

    grunt.initConfig(gruntSettings);

    /* TAREFA PADRÃO */
    grunt.registerTask('default', ['browserSync', 'watch']);

    /* TAREFA GERA TUDO */
    grunt.registerTask('init', ['clean', 'less', 'postcss', 'cssmin', 'babel', 'uglify', 'svgmin', 'copy']);
};
