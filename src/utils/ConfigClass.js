import fs from 'fs';
import yargs from 'yargs';
import { resolve } from 'path';
import gutil from 'gulp-util';
import _defaultsDeep from 'lodash/defaultsDeep';

export default class ConfigClass {
	constructor( config = {}, argv = {} ) {
		this.config = config;
		this.argv = argv;
	}

	get env() {
		const argvEnv = this.argv.env;

		if ( [ 'test', 'prod', 'dev' ].includes( argvEnv ) ) {
			return argvEnv;
		} else if ( 'production' === argvEnv ) {
			return 'prod';
		} else {
			return 'dev';
		}
	}

	get isProd() {
		return 'prod' === this.env;
	}

	get isDev() {
		return 'dev' === this.env;
	}

	get isTest() {
		return 'test' === this.env;
	}

	get workflowName() {
		return undefined === this.argv.workflow ? '' : this.argv.workflow;
	}

	get workflow() {
		if ( '' !== this.workflowName && undefined !== this.config[ this.workflowName ] ) {
			return this.config[ this.workflowName ];
		} else if ( undefined !== this.config.tasks ) {
			return this.config;
		} else {
			return {};
		}
	}

	get cwd() {
		return undefined === this.workflow.cwd ? '' : this.workflow.cwd;
	}
};
//
//const json         = JSON.parse( fs.readFileSync( './package.json' ) ),
//	  browserslist = json.browserslist,
//	  errorExitCode = 1;
//
//let workflow, env, isTest, isProd, isDev,
//	tasks = [],
//	cwd = '',
//	schema = '';
//
//function getEnvMeta( argvEnv ) {
//	const meta = {
//		env: argvEnv,
//		isTest: false,
//		isProd: false,
//		isDev: false
//	};
//
//	switch ( meta.env ) {
//	case 'test':
//		meta.isTest = true;
//		break;
//	case 'prod':
//	case 'production':
//		meta.isProd = true;
//		break;
//	default:
//		meta.env = 'dev';
//		meta.isDev = true;
//	}
//
//	return meta;
//}
//( { env, isTest, isProd, isDev } = getEnvMeta( yargs.argv.env ) );
//
//function getWorkflow() {
//	const name = yargs.argv.workflow;
//
//	if ( undefined === name || undefined !== json.workflows[ name ] ) {
//		gutil.log( gutil.colors.red( `No workflow defined, aborting!` ) );
//		process.exit( errorExitCode );
//	}
//
//	return json.workflows[ name ];
//}
//workflow = getWorkflow();
//
//function getTasks() {
//	if ( undefined !== workflow.tasks ) {
//		return workflow.tasks;
//	} else {
//		return workflow;
//	}
//}
//tasks = getTasks();
//
//function getCwd( workflow ) {
//	if ( undefined !== workflow.cwd ) {
//		return workflow.cwd;
//	} else {
//		return '';
//	}
//}
//cwd = getCwd( workflow );
//
//function getSchema( slug ) {
//	const file = resolve( __dirname, `../../schemas/${ slug }.json` );
//
//	if ( ! fs.existsSync( file ) ) {
//		gutil.log( gutil.colors.yellow( `Schema '${ slug }' not found, ignoring...` ) );
//		return {};
//	}
//
//	return JSON.parse( fs.readFileSync( file ) );
//}
//if ( undefined !== tasks.schema ) {
//	schema = getSchema( tasks.schema );
//	delete tasks.schema;
//	tasks = _defaultsDeep( tasks, schema );
//}
//
//export { tasks, env, cwd, isDev, isTest, isProd, browserslist };
