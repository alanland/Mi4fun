var
    compileJade = require('broccoli-jade'),
    compileStylusSingle = require('broccoli-stylus-single'),
    compileCoffee = require('broccoli-coffee'),
    compileTypeScript = require('broccoli-typescript'),
    concatenate = require('broccoli-concat'),
    mergeTrees = require('broccoli-merge-trees'),
    pickFiles = require('broccoli-static-compiler'),
    uglifyJs = require('broccoli-uglify-js'),
    exclFromTree = require("broccoli-file-remover"),

    app = 'app',
    resources = 'resources',
    dest = "/production",
    appCss,
    appHtml,
    appJs;

/**
 * move the index.html file from the project /app folder
 * into the build production folder
 */
appHtml = exclFromTree("app/views", {
    path: "partials"
});
appHtml = pickFiles(appHtml, {
    srcDir: "/",
    destDir: "app/views"
});
appHtml = compileJade(appHtml,{
    pretty: '  '
});
appHtml = pickFiles(appHtml, {
    srcDir: "app/views",
    destDir: '/production/views'
});

//appHtml = pickFiles('.', {
//    srcDir: '/',
//    files: ['index.html'],
//    destDir: dest
//});


// compile coffee script, bare: no top-level function wrapper
appCoffee = pickFiles(app, {
    srcDir: '/',
    files: ['**/*.coffee']
})
appCoffee = compileCoffee(app, {
    bare: true
})

// compile type script, bare: no top-level function wrapper
appTs = compileTypeScript(appCoffee, {
})

/**
 * concatenate and compress all of our JavaScript files in
 * the project /app folder into a single app.js file in
 * the build production folder
 */
appJs = concatenate(appTs, {
    inputFiles: ['**/*.js'],
    outputFile: '/production/js/app.js',
    header: '/** Copyright Modus Create Inc. 2014 **/'
});
appJs = uglifyJs(appJs, {
    compress: true
});

/**
 * compile all of the STYLUS in the project /resources folder into
 * a single app.css file in the build production/resources folder
 */
appCss = compileStylusSingle(
    ['app/css'],
    'app.styl',
    '/production/css/app.css'
);

/**
 * images
 */
appImage = pickFiles(app, {
    srcDir: 'images',
    destDir: dest + '/images'
})


console.log(appImage)
// merge HTML, JavaScript and CSS trees into a single tree and export it
module.exports = mergeTrees([appHtml, appJs, appCss, appImage], {overwrite: true});