import gulp from 'gulp';
import cache from 'gulp-cached';
import progeny from 'gulp-progeny';
import { tasks, isDev } from '../utils/get-config';
import sass from 'gulp-sass';
import sourcemaps from 'gulp-sourcemaps';
import gulpIf from 'gulp-if';
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import pxtorem from 'postcss-pxtorem';
import autoprefixer from 'autoprefixer';
import assets from 'postcss-assets';
import TaskHelper from '../utils/TaskHelper';

const task = new TaskHelper({
	name: 'css',
	requiredPaths: [ 'src', 'dest' ],
	config: tasks
});

if ( undefined !== task.config ) {
	let fn = function() {
		if ( ! task.isValid() ) {
			return null;
		}

		return task.start()

			// Caching and incremental building (progeny) in Gulp.
			.pipe( gulpIf( isDev, cache( task.cacheName ) ) )
			.pipe( gulpIf( isDev, progeny() ) )

			// Actual SASS compilation.
			.pipe( gulpIf( isDev, sourcemaps.init() ) )
			.pipe( sass({
				includePaths: undefined !== task.config.includePaths ? task.config.includePaths : [],
				outputStyle: isDev ? 'expanded' : 'compressed'
			}).on( 'error', sass.logError ) )
			.pipe( gulpIf( task.config.postcssProcessors, postcss( getProcessors( task.config.postcssProcessors ) ) ) )
			.pipe( gulpIf( isDev, sourcemaps.write( '' ) ) )

			.pipe( task.end() );
	};

	fn.displayName = 'css-compile';

	if ( true === task.config.enableLinter ) {
		gulp.task( 'css', gulp.series( 'css-lint', fn ) );
	} else {
		gulp.task( 'css', fn );
	}
}

function getProcessors( settings = {} ) {
	let processors = [];

	if ( undefined !== settings.cssnext ) {
		processors.push( cssnext( settings.cssnext ) );
	}
	if ( undefined !== settings.autoprefixer ) {
		processors.push( autoprefixer( settings.autoprefixer ) );
	}
	if ( undefined !== settings.pxtorem ) {
		processors.push( pxtorem( settings.pxtorem ) );
	}
	if ( undefined !== settings.assets ) {
		processors.push( assets( settings.assets ) );
	}

	return processors;
}
