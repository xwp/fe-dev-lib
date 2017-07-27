import fs from 'fs';
import gutil from 'gulp-util';
import yargs from 'yargs';
import ConfigClass from './ConfigClass';

const configFile = './package.json';
let configJSON, config;

if ( ! fs.existsSync( configFile ) ) {
	gutil.log( gutil.colors.red( `Config file not found. Aborting...` ) );
	process.exit( 1 );
}

configJSON = JSON.parse( fs.readFileSync( configFile ) );
config = new ConfigClass( configJSON.workflows, yargs.argv );

export const { cwd, env, isDev, isProd, isTest, tasks, workflow, workflowName } = config;
