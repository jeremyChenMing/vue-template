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
    filename: prod ? 'js/[name].[chunkhash:7].js' : 'js/[name].js',
    chunkFilename: prod ? 'js/[id].[chunkhash:7].js' : 'js/[id].chunk.js',//按需加载js命名 require.ensure中使用的
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
          loaders: {
            css: [ 'vue-style-loader', {loader: "css-loader", options: {sourceMap: true}}],
            less: [
              'vue-style-loader',
              { loader: "css-loader",  options: { sourceMap: true  } }, 
              { loader: "less-loader", options: { sourceMap: true } }
            ]
          },
          postcss: [
            require('autoprefixer')({ 
              browsers: ['last 10 Chrome versions', 'last 5 Firefox versions', 'Safari >= 6', 'ie > 8'] 
            })
          ]
        }
      },
      {
        test: /\.less$/,
        // loader: 'style-loader!css-loader!less-loader'
        use: [
          'vue-style-loader',
          { loader: "css-loader", options: {sourceMap: true} },
          { loader: "postcss-loader", options: {sourceMap: true} },
          { loader: "less-loader", options: {sourceMap: true} }
        ]
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      // file-loader 返回的是图片的public URL
      // {
      //   test: /\.(png|jpg|gif|svg)$/,
      //   loader: 'file-loader',
      //   options: {
      //     name: 'assets/[name].[ext]?[hash]'
      //   }
      // },
      // 直接采用url-loader  它对file-loader进行了封装(可以不用file-loader) 其次可以对文件的大小作出限制
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'assets/[name].[hash:7].[ext]'
        }
      },
      // 本地引入iconfont文件，一般用不上
      // {
      //   test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      //   loader: 'url-loader',
      //   options: {
      //     limit: 10000,
      //     name: 'assets/fonts/[name].[hash:7].[ext]'
      //   }
      // }
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
        chunks: ['manifest', 'vendors', name],
        minify: {
            removeAttributeQuotes: true,
            collapseWhitespace: true
        }
      })
    )
}

module.exports.plugins = (module.exports.plugins || []).concat(proHtmlPlugin);
if (prod) {
  // 生产环境
  // module.exports.devtool = '#cheap-module-source-map', //最小 构建慢 推荐用这个
  // module.exports.devtool = '#cheap-source-map', //大小几乎同上  构建快速build speed(+) / rebuild speed(0)
  module.exports.devtool = '#source-map', // 大小几乎同上
  //映射文件，方便调试 //对vendor的大小有很重要的作用 cheap-source-map source-map


  module.exports.plugins = (module.exports.plugins || []).concat([
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

    // enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // 对于moment时间过滤本地化！两种方式
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),

    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',//公共模块提取
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
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      // chunks: ['vendor']
      minChunks: Infinity
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'index',
      async: 'vendor-async',
      children: true,
      minChunks: 3
    }),


    // new CleanWebpackPlugin('./dist'),
  ])
} else{
  // 开发环境
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),  
  ])
}






