/**
 * Cleans dist directory before babel rewrite.
 */

const path = require( 'path' );
const del = require( 'del' );

del( path.resolve( 'dist' ) ).then( () => null );
