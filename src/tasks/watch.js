import gulp from 'gulp';
import { tasks, cwd } from '../utils/config';
import { join } from 'path';

if ( tasks.watch && 0 < tasks.watch.length ) {
	gulp.task( 'watch', () => {

		// Omit some tasks, e.g. `js` is already watched by Webpack.
		const ignoredTasks = [ 'clean' ];
		const filteredTasks = tasks.watch.filter( task => ! ignoredTasks.includes( task ) );

		filteredTasks.forEach( taskSlug => {
			const task = tasks[ taskSlug ];

			if ( null === task || undefined === task || undefined === task.src ) {
				return;
			}

			if ( Array.isArray( task.src ) ) {
				task.src.map( src => gulp.watch( join( cwd, src ), gulp.parallel( taskSlug ) ) );
			} else {
				gulp.watch( join( cwd, task.src ), gulp.parallel( taskSlug ) );
			}
		} );
	} );
}
