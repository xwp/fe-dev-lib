import gulp from 'gulp';
import gulpIf from 'gulp-if';
import cache from 'gulp-cached';
import { tasks, isDev } from '../utils/config';
import TaskHelper from '../classes/TaskHelper';

if ( tasks.copy ) {
	const task = new TaskHelper( {
		name:          'copy',
		requiredPaths: [ 'src', 'dest' ],
		config:        tasks.copy
	} );

	gulp.task( task.name, done => {
		if ( ! task.isValid() ) {
			done();
		}

		return task.start()
			.pipe( gulpIf( isDev, cache( task.cacheName, { optimizeMemory: false } ) ) )
			.pipe( task.end() );
	} );
}
