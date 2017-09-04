import fs from 'fs';
import { resolve } from 'path';

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

	get schema() {
		const schemaPath = ( file ) => resolve( __dirname, `../../schemas/${ file }.json` );
		let path = '';

		if ( fs.existsSync( this.workflow.schema ) ) {
			path = this.workflow.schema;
		} else if ( fs.existsSync( schemaPath( this.workflow.schema ) ) ) {
			path = schemaPath( this.workflow.schema );
		} else {
			return false;
		}

		return JSON.parse( fs.readFileSync( path ) );
	}

	get tasks() {
		if ( ! this.schema ) {
			return this.workflow.tasks;
		}

		let tasks = {};

		for ( let name in this.schema ) {
			let task,
				schemaTask = this.schema[ name ],
				defaultTask = this.workflow.tasks[ name ];

			if ( null === defaultTask ) {

				// Do not include the task if it was nulled by the user.
				continue;
			} else if ( undefined === defaultTask ) {

				// No user defined task config - schema will be used instead.
				defaultTask = {};
			}

			task = Object.assign( {}, schemaTask, defaultTask );

			// Remove null properties.
			for ( let prop in task ) {
				if ( null === task[ prop ] ) {
					delete task[ prop ];
				}
			}

			tasks[ name ] = task;
		}

		return tasks;
	}
};
