var path = require('path');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');//清理打包文件用的

var dlls = [
  'moment',
  'vue',
  'vue-router',
  'underscore',
];

module.exports = {
  output: {
    path:  path.resolve(__dirname, 'dist'),
    // filename: '[name].[chunkhash].js',
    filename: '[name].js',
    // library: '[name]_[chunkhash]',
    library: '[name]',
    publicPath: '/'
  },
  entry: {
    dll: dlls,
  },
  plugins: [
    new CleanPlugin(['dist']), //清理文件夹
    new AssetsPlugin({filename: 'assets.json'}),
    new webpack.DllPlugin({
      path: 'manifest.json',
      // name: '[name]_[chunkhash]',
      name: '[name]',
      // context: path.resolve(__dirname,'./src')
    }),
    //压缩公共代码块
    new webpack.optimize.UglifyJsPlugin({ 
      compress: {
        warnings: false
      }
    }),
  ]
};
