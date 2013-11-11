// Optimizer configuration for r.js (see http://requirejs.org/docs/optimization.html)
({
    name: "application",
    baseUrl: "${project.build.directory}/${project.build.finalName}/modules",
    out: "${project.build.directory}/${project.build.finalName}/modules/application.js",
    optimize: "uglify"
})