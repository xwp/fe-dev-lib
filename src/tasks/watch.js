import gulp from 'gulp';
import { tasks, cwd } from '../utils/get-config';
import { join } from 'path';

if ( tasks.watch && undefined !== tasks.watch.tasks ) {
	gulp.task( 'watch', () => {

		// Omit some tasks, e.g. `js` is already watched by Webpack.
		const ignoredTasks = [ 'js', 'js-lint', 'clean' ],
			filteredTasks = tasks.watch.tasks.filter( task => ! ignoredTasks.includes( task ) );

		filteredTasks.forEach( taskSlug => {
			const task = tasks[ taskSlug ];

			if ( undefined === task.src ) {
				return;
			}

			gulp.watch( join( cwd, task.src ), gulp.parallel( taskSlug ) );
		});
	});
}
