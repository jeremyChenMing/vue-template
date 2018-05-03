
 let webpack = require('webpack');
 let merge = require('webpack-merge');
 var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 let prod_config = require('./webpack.config');

 module.exports = merge(prod_config, {
     plugins: [
         new BundleAnalyzerPlugin()
     ]
 });