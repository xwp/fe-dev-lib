import gulp from 'gulp';
import { cwd, tasks } from '../utils/get-config';
import del from 'del';
import TaskHelper from '../utils/TaskHelper';

if ( tasks.clean ) {
	const task = new TaskHelper( {
		name:          'clean',
		requiredPaths: [ 'src' ],
		config:        tasks.clean
	} );

	gulp.task( task.name, done => {
		if ( task.isValid() ) {
			del( task.src, { cwd } ).then( () => done() );
		} else {
			done();
		}
	} );
}
