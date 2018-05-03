var path = require('path')
var webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const glob = require('glob');
const bundleConfig = require('./assets.json');
const prod = process.env.NODE_ENV === 'production' ? true : false;
const prev = prod ? '' : '../dist';


let entryObj = getEntry();
let pageNameList = Object.keys(entryObj);
let proHtmlPlugin = [];
for (let i = 0; i < pageNameList.length; i++) {
    proHtmlPlugin.push(getHtmlPlugin(pageNameList[i]))
}
function getEntry() {
    var entry = {};
    //读取开发目录,并进行路径裁剪 
    glob.sync('./src/**/index.js')
        .forEach(function (name) {
            var start = name.indexOf('src/') + 4,
                end = name.length - 3;
            var eArr = [];
            var n = name.slice(start, end);
            n = n.split('/')[0];
            if (n !== 'common' && n !== 'home') {
              eArr.push(name);
              entry[n] = eArr;  
            }
        });
    return entry;
};

module.exports = {
  entry: entryObj, //只用一个index文件夹， 其余过滤掉， 提及会小于1M
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].js',
    chunkFilename: 'js/common/[id].chunk.js',//按需加载js命名 require.ensure中使用的
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      },      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          postcss: [
            require('autoprefixer')({ 
              browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] 
            })
          ]
          // loaders: {
          // }
          // other vue-loader options go here
        }
      },
      {
        test: /\.less$/,
        loader: 'style-loader!css-loader!less-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    compress: true, 
    proxy: {
      '/static/': {
        target: 'http://api.d.upvi.com/social-security/',
        changeOrigin: true,
        pathRewrite: {'^/static/': ''}
      }
    }
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendors',//公共模块提取
        // minChunks: Infinity,
        // minChunks: pageNameList.length,//至少三个模块共有部分，才会进行提取

        minChunks (module) {
          // any required modules inside node_modules are extracted to vendor
          return (
            module.resource &&
            /\.js$/.test(module.resource) &&
            module.resource.indexOf(
              path.join(__dirname, './node_modules')
            ) === 0
          )
        }

    }),
    new webpack.DllReferencePlugin({
        // context: path.resolve(__dirname,'./src'), // 指定一个路径作为上下文环境，需要与DllPlugin的context参数保持一致，建议统一设置为项目根目录
        manifest: require('./manifest.json'), // 指定manifest.json
    }),
  ]
}



function getHtmlPlugin(name) {
    return (
      new HtmlWebpackPlugin({
        // favicon: resolve('../src/APPcommon/img/fav.png'),
        filename: name + '.html',
        title: name,
        template: './template/index.html',
        inject: 'body',
        bundleName: prev + bundleConfig.dll.js,
        chunks: ['vendors', name],
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true
        }
      })
    )
}

module.exports.plugins = (module.exports.plugins || []).concat(proHtmlPlugin);
if (process.env.NODE_ENV === 'production') {
  // module.exports.devtool = '#source-map' //映射文件，方便调试 //取消
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false,
        drop_console: true
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    // new CleanWebpackPlugin('./dist'),
  ])
}






