import gulp from 'gulp';
import sass from 'gulp-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import { tasks, cwd } from '../utils/get-config';
import replace from 'gulp-string-replace';
import rename from 'gulp-rename';
import jsonModify from 'gulp-json-modify';
import fs from 'fs-extra';
import { join } from 'path';
import TaskHelper from '../utils/TaskHelper';

if ( tasks['color-scheme'] ) {
	const task = new TaskHelper( {
		name:          'color-scheme',
		requiredPaths: [ 'src', 'dest', 'base' ],
		config:        tasks['color-scheme']
	} );

	let buildMetaJSON, compileSASS, insertCSSintoJSON;

	buildMetaJSON = function ( done ) {
		if ( ! task.isValid() ) {
			done();
		}

		let isFirst = true;

		return task.start()
			.pipe( replace( /([\n\r\t])/gm, '' ) )
			.pipe( replace( /(.+?)\/[\/*]\s?color-schema:start\s?(\*\/)?/gm, '{\n\t"fields": [' ) )
			.pipe( replace( /\/[\/*]\s?color-schema:end\s?(\*\/)?(.+)/gm, '\n\t],\n\t"css": ""\n}' ) )
			.pipe( replace( /\$u-([a-z\-]+):\s*(#[a-f0-9]{3,6});/gm, ( all, name, color ) => {
				let out = '';

				if ( isFirst ) {
					isFirst = false;
				} else {
					out += ',';
				}

				out += '\n\t\t{';
				out += '\n\t\t\t"name": "' + name + '",';
				out += '\n\t\t\t"default": "' + color + '"';
				out += '\n\t\t}';

				return out;
			} ) )
			.pipe( rename( path => {
				path.basename = 'schema';
				path.extname = '.json';
			}) )

			.pipe( task.end() );
	};

	compileSASS = function( done ) {
		if ( ! task.isValid() ) {
			done();
		}

		return task.start()
			.pipe( replace( /^\$u-([a-z\-]+):\s*(#[a-f0-9]{3,6});/gm, ( all, name ) => {
				return `$u-${ name }: #u-${ name };`;
			} ) )
			.pipe( sass( {
				includePaths: undefined !== task.config.cssIncludePaths ? task.config.cssIncludePaths : [],
				outputStyle: 'compressed'
			} ).on( 'error', sass.logError ) )
			.pipe( postcss([ autoprefixer() ]) )
			.pipe( replace( /#u-([a-z\-]+)/gm, ( all, name ) => {
				return `$${ name }`;
			} ) )
			.pipe( rename( path => {
				path.basename = '_schema';
				path.extname = '.css';
			}) )
			.pipe( task.end() );
	};

	insertCSSintoJSON = function() {
		const destPath = join( cwd, task.dest ),
			cssPath = join( destPath, '_schema.css' ),
			jsonPath = join( destPath, 'schema.json' ),
			css = fs.readFileSync( cssPath, 'utf-8' );

		fs.removeSync( cssPath );

		return gulp.src( jsonPath )
			.pipe( jsonModify({
				key: 'css',
				value: css
			}) )
			.pipe( task.end() );
	};

	gulp.task( 'color-scheme', gulp.series( gulp.parallel( buildMetaJSON, compileSASS ), insertCSSintoJSON ) );
}
