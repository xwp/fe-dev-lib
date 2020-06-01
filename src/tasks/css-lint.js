import gulp from 'gulp';
import cache from 'gulp-cached';
import { tasks, isDev } from '../utils/config';
import gulpIf from 'gulp-if';
import postcss from 'gulp-postcss';
import reporter from 'postcss-reporter';
import scss from 'postcss-scss';
import stylelint from 'stylelint';
import TaskHelper from '../classes/TaskHelper';

if ( tasks.css ) {
	const task = new TaskHelper( {
		name: 'css-lint',
		requiredPaths: [ 'src' ],
		config: tasks.css
	} );

	gulp.task( task.name, done => {
		if ( ! task.isValid() ) {
			done();
		}

		return task.start()
			.pipe( gulpIf( isDev, cache( task.cacheName ) ) )
			.pipe( postcss( [
				stylelint(),
				reporter( { clearAllMessages: true } )
			], { syntax: scss } ) );
	} );
}
