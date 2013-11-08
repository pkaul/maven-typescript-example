module.exports = function(grunt) {

    grunt.initConfig({

        // ----- Environment
        // read in some metadata from project descriptor
        project: grunt.file.readJSON('package.json'),

        // define some directories to be used during build
        dir: {

            // location where TypeScript source files are located
            "source_ts": "src/main/ts",
            // location where TypeScript/Jasmine test files are located
            "source_test_ts": "src/test/ts",

            // location where all build files shall be placed
            "target": "target",

            // location to place (compiled) javascript files
            "target_js": "target/js",
            // location to place (compiles) javascript test files
            "target_test_js": "target/js-test",
            // location to place documentation, etc.
            "target_report": "target/report"
        },

        // ---- clean workspace
        clean: {
            target: {
                src: "<%= dir.target %>"
            }
        },

        // ----- TypeScript compilation
        //  See https://npmjs.org/package/grunt-typescript
        typescript: {

            // Compiles the code into a single file. Also generates a typescript declaration file
            compile: {
                src: ['<%= dir.source_ts %>/**/*.ts'],
                dest: '<%= dir.target_js %>/<%= project.name %>.js',
                options: {
                    base_path: '<%= dir.source_ts %>',
                    target: 'es5',
                    declaration: true,
                    comments: true
                }
            },

            // Compiles the tests.
            compile_test: {
                src: ['<%= dir.source_test_ts %>/**/*.ts'],
                dest: '<%= dir.target_test_js %>',
                options: {
                    base_path: '<%= dir.source_test_ts %>',
                    target: 'es5'
                }
            }
        },

        // ------- Unit tests with code coverage
        //  See https://github.com/gruntjs/grunt-contrib-jasmine
        jasmine: {
            run: {
                // the code to be tested
                src: ['<%= dir.target_js %>/**/*.js'],
                options: {

                    // the tests
                    specs: '<%= dir.target_test_js %>/**/*Spec.js',
                    // keepRunner: true, // useful for debugging

                    // -- additional JUnit compliant test reports that Jenkins is able to analyze
                    junit: {
                        path: "<%= dir.target %>/surefire-reports",
                        consolidate: false
                    },


                    // -- Optional: code coverage reports
                    //   See https://github.com/maenu/grunt-template-jasmine-istanbul
                    template: require('grunt-template-jasmine-istanbul'),
                    templateOptions: {
                        coverage: '<%= dir.target_report %>/coverage/coverage.json',
                        report: [
                            {
                                type: 'html',
                                options: { dir: '<%= dir.target_report %>/coverage/html/' }
                            },
                            {
                                // generate a cobertura-style report
                                type: 'cobertura',
                                options: { dir: '<%= dir.target %>/coverage/cobertura' }
                            },
                            {
                                type: 'text-summary'
                            }
                        ]
                    }

                }
            }
        },



        // ------ Optional: Turn generated javascript into an AMD module
        //   See https://npmjs.org/package/grunt-amd-wrap
//        amdwrap: {
//            js: {
//                src: '<%= dir.target_js %>/<%= project.name %>.js',
//                dest: '<%= dir.target_js %>/<%= project.name %>.js'
//            }
//        },

        // ----- Optional: Turn the result JS file into an AMD module
        //  See https://github.com/chrissrogers/grunt-wrap
        wrap: {
            amd: {
                src: '<%= dir.target_js %>/<%= project.name %>.js',
                dest: '<%= dir.target_js %>/<%= project.name %>.js',
                options: {
                    // Wrap existing JS into an AMD-style module definition.
                    //  TRICKY: return the (well known) module variable 'examplelib' as the module.
                    wrapper: ['define(function(){', '\n return {examplelib:examplelib};\n});']
                }
            }
        },

        // ------ Optional: make javascript small (and unreadable)
        uglify: {
            options: {
                // add a small descriptive banner
                banner: '/*! <%= project.name %> - v<%= project.version %> - <%= grunt.template.today("yyyy-mm-dd") %> */'
            },
            minify_js: {
                // minify the only javascript file by renaming it to *.min.js
                files: {
                    '<%= dir.target_js %>/<%= project.name %>.min.js': ['<%= dir.target_js %>/<%= project.name %>.js']
                }

            }
        },


        // ----- Optional: generate documentation
        // Note: This requires documentation to be written in YUIDoc syntax (see http://yui.github.io/yuidoc/syntax/index.html) which is a bit
        //  cumbersome for Typescript where the required information (e.g. @class) already exist.
        //  TODO: Integrate a TypeScript compliant documentation mechanism.
        yuidoc: {
            compile: {
                name: '<%= project.name %>',
                description: '<%= project.description %>',
                version: '<%= project.version %>',
                url: '<%= project.homepage %>',
                options: {
                    paths: '<%= dir.target_js %>',
                    outdir: '<%= dir.target_report %>/apidoc'
                }
            }
        }
    });


    // ----- Setup tasks

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-wrap');

    // Default task(s).
    grunt.registerTask('default', ['clean','typescript:compile','typescript:compile_test','jasmine',/*'amdwrap'*/'wrap','uglify','yuidoc']);

    // Task for running compilation/assembling stuff (corresponds to Maven's "compile" or "resources" lifecycle phase)
    grunt.registerTask('compile', ['typescript:compile','uglify','yuidoc']);
    // Task for running testing stuff (corresponds to Maven's "test" lifecycle phase)
    grunt.registerTask('test', ['typescript:compile_test', 'jasmine']);
    // Task for running testing stuff (corresponds to Maven's "prepare-package" lifecycle phase)
    grunt.registerTask('package', [/*'amdwrap',*/'wrap','uglify']);

};