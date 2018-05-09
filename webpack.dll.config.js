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

// 如果采用静态文件的static 路径，由于devserver 的 content base = false 关闭，所以需要把dll 变为静态文件
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
    new CleanPlugin(['dist']), //清理文件夹 //采用static的时候 清理文件放在run build里面
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
