import fs from 'fs';
import yargs from 'yargs';
import { resolve } from 'path';
import gutil from 'gulp-util';
import _defaultsDeep from 'lodash/defaultsDeep';

const json = JSON.parse( fs.readFileSync( './package.json' ) ),
	workflow = yargs.argv.workflow,
	browserslist = json.browserslist;

let tasks = [],
	cwd = '',
	schema = '',
	isTest = false,
	isProd = false,
	isDev  = false,
	env = yargs.argv.env;

switch ( env ) {
case 'test':
	isTest = true;
	break;
case 'prod':
case 'production':
	isProd = true;
	break;
default:
	isDev = true;
	env = 'dev';
}

if ( undefined !== workflow && undefined !== json.workflows[ workflow ] ) {
	tasks = json.workflows[ workflow ];
}
if ( undefined !== tasks.cwd ) {
	cwd = tasks.cwd;
	delete tasks.cwd;
}

function getSchema( slug ) {
	const file = resolve( __dirname, `../../schemas/${ slug }.json` );

	if ( ! fs.existsSync( file ) ) {
		gutil.log( gutil.colors.yellow( `Schema '${ slug }' not found, ignoring...` ) );
		return {};
	}

	return JSON.parse( fs.readFileSync( file ) );
}
if ( undefined !== tasks.schema ) {
	schema = getSchema( tasks.schema );
	delete tasks.schema;
	tasks = _defaultsDeep( tasks, schema );
}

export { json, tasks, env, cwd, isDev, isTest, isProd, workflow, browserslist };
