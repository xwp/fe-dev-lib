import gutil from 'gulp-util';
import { workflowName, env } from './get-config';

export const preCheck = function() {
	if ( undefined === workflowName ) {
		gutil.log( `Using '${ gutil.colors.yellow( workflowName ) }' workflow...` );
	}
	if ( undefined !== env ) {
		gutil.log( `Using '${ gutil.colors.yellow( env ) }' environment...` );
	}
};
