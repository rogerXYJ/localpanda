var path = require('path')
var config = require('../config')
var utils = require('./utils')
var projectRoot = path.resolve(__dirname, '../')
var glob = require('glob');
var webpack = require('webpack');
var entries = getEntry('./src/module/**/*.js'); // 获得入口js文件



var env = process.env.NODE_ENV
// check env & config/index.js to decide weither to enable CSS Sourcemaps for the
// various preprocessor loaders added to vue-loader at the end of this file
var cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
var cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
var useCssSourceMap = cssSourceMapDev || cssSourceMapProd

var webpackConfig = {
	entry: entries,
	output: {
		path: config.build.assetsRoot,
		publicPath: (process.env.NODE_ENV === 'production'||process.env.NODE_ENV === 'test'||process.env.NODE_ENV === 'pre'||process.env.NODE_ENV === 'pre02') ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
		filename: '[name].js'
	},
	resolve: {
		extensions: ['', '.js', '.vue'],
		fallback: [path.join(__dirname, '../node_modules')],
		alias: {
			'vue$': 'vue/dist/vue',
			'src': path.resolve(__dirname, '../src'),
			'common': path.resolve(__dirname, '../src/common'),
			'components': path.resolve(__dirname, '../src/components')
			
		}
	},
	resolveLoader: {
		fallback: [path.join(__dirname, '../node_modules')]
	},
	plugins: [
		
	],
	module: {
		loaders: [{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.js$/,
				loader: 'babel',
				include: projectRoot,
				exclude: /node_modules/
			},
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: utils.assetsPath('img/[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url',
				query: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}
			// {
			//        test: /vue-scroller.src.*?js$/,
			//        loader: 'babel'
			//    }
		]
	},
	vue: {
		loaders: utils.cssLoaders({
			sourceMap: useCssSourceMap
		}),
		postcss: [
			require('autoprefixer')({
				browsers: ['last 2 versions']
			})
		]
	},
	babel: {
		presets: ['es2015'],
		plugins: ['transform-runtime']
	}
}

const vuxLoader = require('vux-loader')
module.exports = vuxLoader.merge(webpackConfig, {
  plugins: ['vux-ui']
})

function getEntry(globPath) {
	var entries = {},
		basename, tmp, pathname;

	glob.sync(globPath).forEach(function(entry) {
		basename = path.basename(entry, path.extname(entry));
		var n = (entry.split('/')).length - 1;
		//		tmp = entry.split('/').splice(-3);
		if(n == 4) {
			tmp = entry.split('/').splice(-3);
		} else if(n == 5) {
			tmp = entry.split('/').splice(-4);
		} else if(n == 6) {
			tmp = entry.split('/').splice(-5);
		}
		pathname = basename; // 正确输出js和html的路径
		//		pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
		entries[pathname] = entry;
	});

	return entries;
}
function getHost() {
	console.log(process.env.NODE_ENV,'-------------------');
	switch(process.env.NODE_ENV) {
		case "development":
			return '"http://www.localpanda.com/feedback/commit"';
		case "production":
			return '"http://www.localpanda.com/feedback/commit"';
		case "test":
			return '"http://www.localpanda.com/feedback/commit"';
		case "pre02":
			return '""';
		case "pre":
			return '""';
		default:
			return'""';
	}
}
function setParam(reqObj, reqPath, reqSrv,argType) {
	reqSrv=reqSrv||'nns';
	argType=argType|| 1;
	var str = JSON.stringify(reqObj);
	var reqStr = {
		path: reqPath,
		param: 'reqStr=' + str,
		srv: reqSrv
	}
	if(argType==1){
		return JSON.stringify(reqStr);
	}else if(argType==2){
		return reqStr;
	}
}

