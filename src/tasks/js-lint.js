import gulp from 'gulp';
import cache from 'gulp-cached';
import { tasks, isDev, isProd } from '../utils/config';
import eslint from 'gulp-eslint';
import gulpIf from 'gulp-if';
import TaskHelper from '../classes/TaskHelper';

if ( tasks.js ) {
	const task = new TaskHelper( {
		name: 'js-lint',
		requiredPaths: [ 'src' ],
		config: tasks.js
	} );

	gulp.task( task.name, done => {
		if ( ! task.isValid() ) {
			done();
		}

		return task.start()
			.pipe( gulpIf( isDev, cache( task.cacheName ) ) )
			.pipe( eslint() )
			.pipe( gulpIf( isProd, eslint.format() ) )
			.pipe( gulpIf( isProd, eslint.failAfterError() ) );
	} );
}
