import { tasks, isProd, isDev, cwd } from '../utils/config';
import gulp from 'gulp';
import gutil from 'gulp-util';
import { resolve } from 'path';
import webpack from 'webpack';
import webpackStream from 'webpack-stream';
import { removeEmpty } from 'webpack-config-utils';
import plumber from 'gulp-plumber';
import browserslist from 'browserslist';
import redent from 'redent';

if ( tasks.js ) {
	const redentCount = 11;

	let fn = function() {
		const paths = tasks.js;
		const webpackConfig = {
			context: resolve( cwd, paths.base ),
			entry: paths.entry,
			cache: true,

			output: {
				filename: '[name].js',
				pathinfo: isDev
			},

			stats: {
				colors: true,
				modules: true,
				version: false
			},

			devtool: isProd ? 'source-map' : 'inline-source-map',

			resolveLoader: {
				modules: [ resolve( __dirname, '../../node_modules' ) ]
			},

			module: {
				rules: [
					{
						test: /\.js$/,
						exclude: /node_modules/,
						use: [ {
							loader: 'babel-loader',
							options: {
								presets: [ [
									'env',
									{
										targets: {
											browsers: browserslist()
										}
									}
								] ]
							}
						}, {
							loader: 'eslint-loader',
							options: {
								failOnError: Boolean( isProd ),
								emitWarning: true,
								configFile: resolve( __dirname, '../../.eslintrc.js' )
							}
						} ]
					}
				]
			},

			plugins: removeEmpty( [
				isProd ? new webpack.optimize.UglifyJsPlugin() : undefined
			] )
		};

		return gulp.src( resolve( cwd, paths.base ) )
			.pipe( plumber() )
			.pipe( webpackStream(
				webpackConfig,
				webpack,
				( err, stats ) => {
					if ( err ) {
						gutil.log( gutil.colors.red( err ) );
					} else {
						gutil.log( `Webpack Build Complete\n${redent( stats.toString( webpackConfig.stats ), redentCount )}` );
					}
				}
			) )
			.pipe( plumber.stop() )
			.pipe( gulp.dest( resolve( cwd, paths.dest ) ) );
	};

	fn.displayName = 'js-compile';

	if ( undefined !== tasks['js-lint'] ) {
		gulp.task( 'js', gulp.series( 'js-lint', fn ) );
	} else {
		gulp.task( 'js', fn );
	}
}
