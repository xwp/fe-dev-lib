'use strict';

var _getConfig = require('../utils/get-config');

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpUtil = require('gulp-util');

var _gulpUtil2 = _interopRequireDefault(_gulpUtil);

var _path = require('path');

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackStream = require('webpack-stream');

var _webpackStream2 = _interopRequireDefault(_webpackStream);

var _progressBarWebpackPlugin = require('progress-bar-webpack-plugin');

var _progressBarWebpackPlugin2 = _interopRequireDefault(_progressBarWebpackPlugin);

var _webpackConfigUtils = require('webpack-config-utils');

var _gulpPlumber = require('gulp-plumber');

var _gulpPlumber2 = _interopRequireDefault(_gulpPlumber);

var _browserslist = require('browserslist');

var _browserslist2 = _interopRequireDefault(_browserslist);

var _redent = require('redent');

var _redent2 = _interopRequireDefault(_redent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if (_getConfig.tasks.js) {
	var redentCount = 11;

	var fn = function fn() {
		var paths = _getConfig.tasks.js;
		var webpackConfig = {
			context: (0, _path.resolve)(_getConfig.cwd, paths.base),
			entry: paths.entry,
			cache: true,

			output: {
				filename: '[name].js',
				pathinfo: _getConfig.isDev
			},

			stats: {
				colors: true,
				modules: true,
				version: false
			},

			devtool: _getConfig.isProd ? 'source-map' : 'inline-source-map',

			module: {
				rules: [{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [{
						loader: 'babel-loader',
						options: {
							presets: [['env', {
								targets: {
									browsers: (0, _browserslist2.default)()
								}
							}]]
						}
					}, {
						loader: 'eslint-loader',
						options: {
							failOnError: _getConfig.isProd ? true : false,
							emitWarning: true
						}
					}]
				}]
			},

			plugins: (0, _webpackConfigUtils.removeEmpty)([new _progressBarWebpackPlugin2.default({
				width: 8,
				complete: '•',
				incomplete: _gulpUtil2.default.colors.grey('·'),
				format: (0, _redent2.default)('[:bar] ' + _gulpUtil2.default.colors.green(':percent') + ' (:elapsed seconds)', 0),
				summary: false
			}), _getConfig.isProd ? new _webpack2.default.optimize.UglifyJsPlugin() : undefined])
		};

		return _gulp2.default.src((0, _path.resolve)(_getConfig.cwd, paths.base)).pipe((0, _gulpPlumber2.default)()).pipe((0, _webpackStream2.default)(webpackConfig, _webpack2.default, function (err, stats) {
			return _gulpUtil2.default.log((0, _redent2.default)(stats.toString(webpackConfig.stats), redentCount).trim());
		})).pipe(_gulpPlumber2.default.stop()).pipe(_gulp2.default.dest((0, _path.resolve)(_getConfig.cwd, paths.dest)));
	};

	fn.displayName = 'js-compile';

	if (undefined !== _getConfig.tasks['js-lint']) {
		_gulp2.default.task('js', _gulp2.default.series('js-lint', fn));
	} else {
		_gulp2.default.task('js', fn);
	}
}