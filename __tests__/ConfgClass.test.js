/* eslint-env jest */

import ConfigClass from '../src/utils/ConfigClass';

describe( 'ConfigClass env', () => {
	let configProd = new ConfigClass( {}, { env: 'prod' } ),
		configProduction = new ConfigClass( {}, { env: 'production' } ),
		configDevelopment = new ConfigClass( {}, { env: 'development' } ),
		configNoEnv = new ConfigClass();

	it( 'is set to prod when env is prod', () => {
		expect( configProd.env ).toBe( 'prod' );
	} );
	it( 'sets isProd to true if env is prod', () => {
		expect( configProd.isProd ).toBe( true );
	} );
	it( 'sets isDev to false if env is prod', () => {
		expect( configProd.isDev ).toBe( false );
	} );
	it( 'sets isTest to false if env is prod', () => {
		expect( configProd.isTest ).toBe( false );
	} );

	it( 'is set to prod when env is production', () => {
		expect( configProduction.env ).toBe( 'prod' );
	} );

	it( 'is set to dev when env is development', () => {
		expect( configDevelopment.env ).toBe( 'dev' );
	} );
	it( 'sets isProd to false if env is development', () => {
		expect( configDevelopment.isProd ).toBe( false );
	} );
	it( 'sets isDev to true if env is development', () => {
		expect( configDevelopment.isDev ).toBe( true );
	} );
	it( 'sets isTest to false if env is development', () => {
		expect( configDevelopment.isTest ).toBe( false );
	} );

	it( 'is set to dev when no env is provided', () => {
		expect( configNoEnv.env ).toBe( 'dev' );
	} );
} );

describe( 'ConfigClass workflowName', () => {
	let configA = new ConfigClass( {}, { workflow: 'test-workflow' } ),
		configB = new ConfigClass();

	it( 'is set to proper value if workflow argv is provided', () => {
		expect( configA.workflowName ).toBe( 'test-workflow' );
	} );
	it( 'is set to an empty string if workflow argv  is not provided', () => {
		expect( configB.workflowName ).toBe( '' );
	} );
} );

describe( 'ConfigClass workflow', () => {
	let configA = new ConfigClass( { 'test-workflow': { testProp1: 10, tasks: {} } }, { workflow: 'test-workflow' } ),
		configB = new ConfigClass( { testProp2: 20, tasks: {} } ),
		configC = new ConfigClass( { testProp3: 30, invalidTasksPropName: {} } );

	it( 'is set to proper object if workflow name anc config is provided', () => {
		expect( configA.workflow ).toMatchObject( { testProp1: 10, tasks: {} } );
	} );
	it( 'is set to proper object if no workflow name is provided, but config is at the top level', () => {
		expect( configB.workflow ).toMatchObject( { testProp2: 20, tasks: {} } );
	} );
	it( 'is set to proper an empty object if no workflow name and no config is provided', () => {
		expect( configC.workflow ).toMatchObject( {} );
	} );
} );

describe( 'ConfigClass cwd', () => {
	let configA = new ConfigClass( { cwd: 'test/dir', tasks: {} } ),
		configB = new ConfigClass();

	it( 'is set to proper path if cwd is provided', () => {
		expect( configA.cwd ).toBe( 'test/dir' );
	} );
	it( 'is set to an empty string if cwd is not provided', () => {
		expect( configB.cwd ).toBe( '' );
	} );
} );

describe( 'ConfigClass schema', () => {
	let configA = new ConfigClass( { schema: './__tests__/test-schema.json', tasks: {} } ),
		configB = new ConfigClass( { schema: 'default', tasks: {} }),
		configC = new ConfigClass( { tasks: {} });

	it( 'returns proper relative schema file', () => {
		expect( configA.schema ).toHaveProperty( 'task1' );
		expect( configA.schema ).toHaveProperty( 'task2' );
		expect( configA.schema ).toHaveProperty( 'task2.task2prop1' );
		expect( configA.schema ).toHaveProperty( 'task2.task2prop2' );
		expect( configA.schema ).toHaveProperty( 'task3' );
		expect( configA.schema ).toHaveProperty( 'task3.task3prop1' );
		expect( configA.schema ).toHaveProperty( 'task3.task3prop1.task3subprop1' );
	} );

	it( 'returns named schema if schema name is provided in config', () => {
		expect( configB.schema ).toHaveProperty( 'clean' );
		expect( configB.schema ).toHaveProperty( 'css' );
		expect( configB.schema ).toHaveProperty( 'images' );
	} );

	it( 'returns empty object if no schema is provided in config', () => {
		expect( configC.schema ).toBe( false );
	} );
} );

describe( 'ConfigClass tasks', () => {
	let configA = new ConfigClass( { tasks: { taskA: 'valA', taskB: { prop1: 'valB' } } } ),
		configB = new ConfigClass( { schema: './__tests__/test-schema.json', tasks: {
			task1: null,
			task2: {
				task2prop2: 'overridden value',
				task2newProp2: 'new prop, new value'
			},
			task3: {
				task3prop1: {
					newProp: 'whole new object'
				},
				task3prop2: null
			},
			task4: null
		} });

	it( 'include tasks from the config', () => {
		expect( configA.tasks ).toEqual( { taskA: 'valA', taskB: { prop1: 'valB' } } );
	} );

	it( 'include test schema tasks overridden by config tasks', () => {
		expect( configB.tasks ).toEqual({
			task2: {
				task2prop1: "val2",
				task2prop2: 'overridden value',
				task2newProp2: 'new prop, new value'
			},
			task3: {
				task3prop1: {
					newProp: 'whole new object'
				}
			}
		});
	} );
} );
