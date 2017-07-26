import gutil from 'gulp-util';
import { workflow, env } from './get-config';

export const preCheck = function() {
	const exitCode = 1;

	if ( undefined === workflow ) {
		gutil.log( gutil.colors.red( `No workflow provided, aborting!` ) );
		process.exit( exitCode );
	} else {
		gutil.log( `Using '${ gutil.colors.yellow( workflow ) }' workflow...` );
	}

	if ( undefined !== env ) {
		gutil.log( `Using '${ gutil.colors.yellow( env ) }' environment...` );
	}
};
