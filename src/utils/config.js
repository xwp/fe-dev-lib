import fs from 'fs';
import gutil from 'gulp-util';
import yargs from 'yargs';
import path from 'path';
import Config from '../classes/Config';

const configFile = path.resolve( './package.json' );
let configJSON, config;

if ( ! fs.existsSync( configFile ) ) {
	gutil.log( gutil.colors.red( `Config file not found. Aborting...` ) );
	process.exit( 1 ); // eslint-disable-line no-magic-numbers
}

configJSON = JSON.parse( fs.readFileSync( configFile ) );
config = new Config( configJSON.workflows, yargs.argv );

export const { cwd, env, isDev, isProd, isTest, tasks, workflow, workflowName } = config;
