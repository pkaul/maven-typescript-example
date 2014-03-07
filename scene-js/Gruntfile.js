module.exports = function(grunt) {

    grunt.initConfig({

        // ----- Environment
        // read in some metadata from project descriptor
        project: grunt.file.readJSON('package.json'),

        // define some directories to be used during build
        dir: {

            // location of all source files
            "source": "src",

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

            // Compiles main code. Add declaration file files
            compile: {
                src: ['<%= dir.source_ts %>/**/*.ts'],
                dest: '<%= dir.target_js %>',
                options: {
                    base_path: '<%= dir.source_ts %>',
                    target: 'es5',
                    declaration: true,
                    comments: true,
                    module: 'amd'
                }
            },
//
//            // Compiles the tests (and the module code again so that import paths are working).
//            compile_test: {
//                src: ['<%= dir.source_test_ts %>/**/*.ts','<%= dir.source_ts %>/**/*.ts'],
//                dest: '<%= dir.target_test_js %>',
//                options: {
//                    base_path: '<%= dir.source %>',
//                    target: 'es5',
//                    module: 'amd'
//                }
//            }
        }

        // ------- Unit tests with code coverage
        //  See https://github.com/gruntjs/grunt-contrib-jasmine
//        jasmine: {
//            run: {
//                // the code to be tested
//                src: ['<%= dir.target_test_js %>/main/**/*.js'],
//                options: {
//
//                    // the tests
//                    specs: '<%= dir.target_test_js %>/test/**/*Spec.js',
//                    keepRunner: true, // useful for debugging
//
//                    // -- additional JUnit compliant test reports that Jenkins is able to analyze
//                    junit: {
//                        path: "<%= dir.target %>/surefire-reports",
//                        consolidate: false
//                    },
//
//
//                    // -- Optional: code coverage reports
//                    //   See https://github.com/maenu/grunt-template-jasmine-istanbul
//                    template: require('grunt-template-jasmine-istanbul'),
//                    templateOptions: {
//
//                        // options for jasmine-istanbul
//                        coverage: '<%= dir.target_report %>/coverage/coverage.json',
//                        report: [
//                            {
//                                type: 'html',
//                                options: { dir: '<%= dir.target_report %>/coverage/html' }
//                            },
//                            {
//                                // generate a cobertura-style report
//                                type: 'cobertura',
//                                options: { dir: '<%= dir.target_report %>/coverage/cobertura' }
//                            },
//                            {
//                                type: 'text-summary'
//                            }
//                        ],
//
//                        // Run jasmine in AMD/RequireJS mode (because all compiled files are AMD!)
//                        //   https://github.com/cloudchen/grunt-template-jasmine-requirejs
//                        template: require('grunt-template-jasmine-requirejs'),
//                        templateOptions: {
//                            requireConfig: {
//                                // as described in https://github.com/maenu/grunt-template-jasmine-istanbul:
//                                // use instrumented classes rather than the originals
//                                baseUrl: '.grunt/grunt-contrib-jasmine/<%= target_test_js %>',
//                                // HACK: Fix nasty 'wrong uri' problem on windows. The location of the reporter.js
//                                //  contains backslashes that can't be resolved by requirejs
//                                map: {
//                                  '*': {
//                          			'.gruntgrunt-contrib-jasminegrunt-template-jasmine-istanbul\reporter.js':
//                                        '.grunt/grunt-contrib-jasmine/grunt-template-jasmine-istanbul/reporter.js'
//                                  }
//                                }
//                            }
//                        }
//                    }
//                }
//            }
//        }
    });


    // ----- Setup tasks

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    // Default task(s).
    grunt.registerTask('default', ['clean','typescript:compile'/*,'typescript:compile_test','jasmine','uglify'*/]);

    // Task for running compilation/assembling stuff (corresponds to Maven's "compile" or "resources" lifecycle phase)
    grunt.registerTask('compile', ['typescript:compile']);
    // Task for running testing stuff (corresponds to Maven's "test" lifecycle phase)
    grunt.registerTask('test', [/*'typescript:compile_test', 'jasmine'*/]);
    // Task for running testing stuff (corresponds to Maven's "prepare-package" lifecycle phase)
    grunt.registerTask('package', [/*'uglify'*/]);

};