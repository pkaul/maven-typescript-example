/**
 * Bootstraps the example application:
 *  Loads the 'demo' module from 'example-library-js' via RequireJS and instantiates some logic from this library
 */
require(['example-library-js/demo/TrianglesScene'], function(TrianglesScene) {

    // fetch canvas element
    var canvas = window.document.getElementById("canvas");

    // instantiate and run scene
    new TrianglesScene(canvas).start();
});