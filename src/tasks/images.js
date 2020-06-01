import gulp from 'gulp';
import gulpIf from 'gulp-if';
import cache from 'gulp-cached';
import imagemin from 'gulp-imagemin';
import { tasks, isDev } from '../utils/config';
import TaskHelper from '../classes/TaskHelper';

if ( tasks.images ) {
	const task = new TaskHelper( {
		name: 'images',
		requiredPaths: [ 'src', 'dest' ],
		config: tasks.images
	} );

	gulp.task( task.name, done => {
		if ( ! task.isValid() ) {
			done();
		}

		return task.start()
			.pipe( gulpIf( isDev, cache( task.cacheName, { optimizeMemory: false } ) ) )
			.pipe( imagemin() )
			.pipe( task.end() );
	} );
}
