'use strict';

const moduleExportsConfig = function( environment ) {
  console.log( "" + new Date().toLocaleString() );
  return {
    mode: "production",
    entry: './index.js',
    output: {
      filename: 'main.js',
      path: __dirname + '/webpackoutput',
    },
    optimization: {
      minimize: false
    },
    watchOptions: {
      ignored: /node_modules/
    },
    devtool: 'source-map',
    module: {
      rules: [ {
        use: [ "source-map-loader" ],
      } ]
    }
  }
}

module.exports = moduleExportsConfig;