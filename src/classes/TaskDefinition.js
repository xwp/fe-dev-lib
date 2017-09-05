import gulp from 'gulp';
import gutil from 'gulp-util';
import requireDir from 'require-dir';
import path from 'path';
import fs from 'fs';

let instance = null;

export default class TaskDefinition {

	/**
	 * Load all Gulp tasks from `tasks` dir.
	 *
	 * @param {Object} tasks List of all tasks.
	 */
	constructor( tasks ) {
		if ( null === instance ) {
			instance = this;
		}

		this._tasks = tasks;

		// Require all default tasks.
		requireDir( path.resolve( __dirname, '../tasks' ) );

		// Return the instance.
		return instance;
	}

	/**
	 * Filter the list to only contain existing Gulp tasks.
	 *
	 * @param {Array} tasks Set of tasks.
	 * @return {Array} Filtered array of tasks.
	 */
	filterTasks( tasks ) {
		return Object.keys( tasks ).filter( task => {

			// Require custom task defined directly in the user's project.
			if ( undefined !== tasks[ task ].taskSrc ) {
				const taskSrc = path.resolve( tasks[ task ].taskSrc );

				if ( ! fs.existsSync( taskSrc ) ) {
					gutil.log( `No task has been found in '${ gutil.colors.red( taskSrc ) }', ignoring!` );
					return false;
				} else {
					const taskFn = require( taskSrc );
					gulp.task( task, taskFn );
				}
			}

			// Make sure each Gulp task is defined.
			if ( undefined === gulp.task( task ) ) {
				gutil.log( `Task '${ gutil.colors.red( task ) }' is not defined, ignoring!` );
				return false;
			}

			return true;
		} );
	}

	/**
	 * Split tasks into 3 categories: main tasks, before and after.
	 *
	 * @param {Array} allTasks Set of all tasks
	 * @param {Array} ignoredTasks Tasks to ignore
	 * @return {{before: Array, tasks: Array, after: Array}} Categorized tasks object
	 */
	sortTasks( allTasks, ignoredTasks ) {
		let tasks = allTasks,
			before = [],
			after = [];

		if ( undefined !== ignoredTasks ) {
			tasks = tasks.filter( task => ! ignoredTasks.includes( task ) );
		}

		if ( tasks.includes( 'clean' ) ) {
			before.push( 'clean' );
			tasks = tasks.filter( task => 'clean' !== task );
		}

		if ( tasks.includes( 'watch' ) ) {
			after.push( 'watch' );
			tasks = tasks.filter( task => 'watch' !== task );
		}

		return { before, tasks, after };
	}

	get gulpTasks() {
		let gulpTasks = [],
			tasks = this._tasks;

		tasks = this.filterTasks( tasks );
		tasks = this.sortTasks( tasks, [ 'js-lint' ] );

		if ( 0 < tasks.before.length ) {
			gulpTasks.push( gulp.parallel( tasks.before ) );
		}
		if ( 0 < tasks.tasks.length ) {
			gulpTasks.push( gulp.parallel( tasks.tasks ) );
		}
		if ( 0 < tasks.after.length ) {
			gulpTasks.push( gulp.parallel( tasks.after ) );
		}

		return gulpTasks;
	}
}
