/**
 * Runs Babel CLI to build SRC -> dist
 */

const { rm, mv, exec } = require( 'shelljs' );
const { resolve } = require( 'path' );
const { existsSync } = require( 'fs' );

// First remove the dist directory.
rm( '-rf', 'dist' );

// Babel Compile.
exec( '$(npm bin)/babel src --out-dir dist' );

// Rename Gulpfile.
if ( existsSync( resolve( 'dist/gulpfile.babel.js' ) ) ) {
	mv( './dist/gulpfile.babel.js', './dist/gulpfile.js' );
}
