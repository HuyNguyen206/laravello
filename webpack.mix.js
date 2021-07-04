const mix = require('laravel-mix');
class Graphql {
    dependencies(){
        return ['graphql', 'graphql-tag']
    }
    webpackRules() {
        return {
            test: /\.(graphql|gql)$/,
            exclude: /node_modules/,
            loaders: 'graphql-tag/loader'
        };
    }
}

mix.extend('graphql', new Graphql())
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js')
    .postCss("resources/css/app.css", "public/css", [
        require("tailwindcss"),
    ]);
mix.graphql()
